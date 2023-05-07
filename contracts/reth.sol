//SPDX-License-Identifier: unlicensed
pragma solidity ^0.8.0;

/** 
* @title rETH contract
* @author Refi
 */
import "./tokenHelpers/RERC20.sol";
import "./tokenHelpers/openzeppelin/IERC20.sol";
import "./utils/openzeppelin/Ownable.sol";
import "./inherited/ErrorReporter8.sol";
import "./utils/openzeppelin/Pausable.sol";
import "./utils/openzeppelin/ReentrancyGuard.sol";
import "./Interfaces/Ievaluator.sol";
import "./Interfaces/compound/Ioracle.sol";
import "./Interfaces/Irswap.sol";

interface IWETH9 is IERC20 {
    /// @notice Deposit ether to get wrapped ether
    function deposit() external payable;

    /// @notice Withdraw wrapped ether to get ether
    function withdraw(uint256) external;
}
interface interfaceYieldVault is IERC20 {
    // Check the the balance along with the investment in the vault
    function underlyingBalanceWithInvestment() external view returns (uint256);
    
    //Harvest the fund
    function deposit(uint256) external;
    
    //Withdraw fDAI from the pool to vault
    function withdraw(uint256) external;
}


interface interfaceYieldPool {
    //Check staked fUsdc
    function balanceOf(address) external view returns (uint256);

    //Stake funds
    function stake(uint256) external;

    //Unstake funds
    function withdraw(uint256) external;

    //Get Rewards
    function getReward() external;
}


interface error {
    /**
     * @dev Possible error codes that we can return
     */
    enum MathError {
        NO_ERROR,
        DIVISION_BY_ZERO,
        INTEGER_OVERFLOW,
        INTEGER_UNDERFLOW
    }
}


interface CErc20 is error {

    function borrowIndex() external view returns (uint256);

    function accrueInterest() external returns (uint256);

    function borrow(uint256) external returns (uint256);

    function repayBorrow(uint256) external returns (uint256);
}


interface CEth is error, IERC20 {

    function mint() external payable;

    function redeem(uint256) external returns (uint256);

    function balanceOfUnderlying(address) external returns (uint256);

    function exchangeRateCurrent() external returns (uint256);

    function exchangeRateStored() external view returns (uint256);
}


// ██████╗░███████╗████████╗██╗░░██╗  ████████╗░█████╗░██╗░░██╗███████╗███╗░░██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║░░██║  ╚══██╔══╝██╔══██╗██║░██╔╝██╔════╝████╗░██║
// ██████╔╝█████╗░░░░░██║░░░███████║  ░░░██║░░░██║░░██║█████═╝░█████╗░░██╔██╗██║
// ██╔══██╗██╔══╝░░░░░██║░░░██╔══██║  ░░░██║░░░██║░░██║██╔═██╗░██╔══╝░░██║╚████║
// ██║░░██║███████╗░░░██║░░░██║░░██║  ░░░██║░░░╚█████╔╝██║░╚██╗███████╗██║░╚███║
// ╚═╝░░╚═╝╚══════╝░░░╚═╝░░░╚═╝░░╚═╝  ░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚══╝


/**
@notice Refi contract named as rETH
 */

contract rETH is
    ERC20,
    Ownable,
    error,
    TokenErrorReporter,
    Pausable,
    ReentrancyGuard
{

    /// @notice Instance of Compound's ceth
    CEth Exceth;
    /// @notice Instance of Compound's Excdai
    CErc20 Excdai;
    /// @notice Instance of DAI token
    IERC20 dai =
        IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    /// @notice Instance of Compound's Oracle
    IOracle Exoracle;
    /// @notice Instance of Compound's Comptroller
    ComptrollerInterface ExCompTroller;
    /// @notice Instance of Harvest.finance's Expool
    interfaceYieldPool Expool;
    /// @notice The number of harvest don till now
    uint256 public harvestIndex;
    /// @notice address of Compound's Comp Tokens
    address comp = 0xc00e94Cb662C3520282E6f5717214004A7f26888;
    /// @notice Instance of Harvest.finance's FARM token
    IERC20 farm = IERC20(0xa0246c9032bC3A600820415aE600c6388619A14D);
        /// @notice Instance of Weth token
    IWETH9 weth = IWETH9(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    /// @notice Instance of Harvest.finance's DAI Vault
    interfaceYieldVault Exvault;
    

    /**
     * @notice Container for Harvest Information
     * @member priceEthDai Conversion factor from Eth to Dai 
     * @member lendingAmt amount of profit obtained from lender protocol
     * @member yieldAmt amount of profit earned from Yield protocol
     * @member supplyEth Total Eth supplied to the lender
     * @member borrowIndex borrow Index of cDai at the time of harvest
     * @member tLTV target LTV of Vault at the time of Harvest
     * @member reserveAmount reserve Factor of the Vault at the time of harvest
     * @member exchangeRate the factor which multiplies with cEth to give Eth amount (scaled to 10^18)
     * @member totalBorrowsEth total borrow Amount taken by the users
     */
    struct harvestSnapshot {
        uint256 priceEthDai;
        uint256 lendingAmt;
        uint256 yieldAmt;
        uint256 supplyEth;
        uint256 borrowIndex;
        uint256 tLTV;
        uint256 reserveAmount;
        uint256 exchangeRate;
        uint256 totalBorrowsEth;
    }


    /**
     * @notice Container for user earnings in a harvest information
     * @member uptillHarvest till which harvest the data has been calculated
     * @member rewards User's share of the earnings from all Harvests (lender + Yield)
     * @member lastRewards User's share of the earning from last harvest
     * @member repaid Total Auto repayments till now
     */
    struct data {
        uint256 uptillHarvest;
        uint256 rewards;
        uint256 lastRewards;
        uint256 repaid;
    }

    /// @notice Earnings of user in all the harvests
    mapping(address => data) public userData;

    /// @notice Array string Data of Each Harvest
    harvestSnapshot[] public harvestData;



    /**
     * @notice Container for borrow balance information
     * @member principal Total balance (with accrued interest), after applying the most recent balance-changing action
     * @member interestIndex Global borrowIndex as of the most recent balance-changing action
     */
    struct BorrowSnapshot {
        uint256 principal;
        uint256 interestIndex;
    }

    /**
     * @notice Mapping of user addresses to outstanding borrow balances
     */
    mapping(address => BorrowSnapshot) public accountBorrows;

    /**
     * @notice Total outstanding borrow balances of users
     */
    BorrowSnapshot public totalUserBorrows;
    
    
    //Time of last harvesting and this param used in the bot
    uint256 public lastHarvest;

    //Anount invested in harvest
    uint256 public invested;
    
    //Variable of eval for evaluator contract instances
    /// @dev Evaluator address not public because of size issue
    Ieval eval;
    
    //Address of the Stability Pool Contract(rseth)
    /// @dev stabilityUserContract address not public because of size issue
    address stabilityUserContract;


 
    //variable of rswap for RefiSwap contract instances 
    Irswap rswap;

    /// @notice Stored LTV of Vault
    // uint256 public vaultLTVStored;

    //Events for various operations
    event refitrollerChanged(address newcontroller);

    event raccrued(uint256 principal, uint256 interestIndex);

    event deposited(address user, uint256 amount, uint256 rAmount);

    event withdrawn(address user, uint256 amount, uint256 rAmount);

    event claimedVault(uint256 time, uint256 comp, uint256 farm);

    event harvested(
        uint256 harvestNo,
        uint256 priceEthusdc,
        uint256 lenderDAI,
        uint256 yieldDAI,
        uint256 supplyEth,
        uint256 tltv,
        uint256 reserveEarned,
        uint256 exchangeRate,
        uint256 totalBorrowsEthUsers
    );

    event borrowed(address user, uint amount);
    event repaid(address user,uint newBorrowBalance,uint amountPaid);

    

    constructor(address refiController,address _rswap)
        ERC20("reth", "RETH", refiController)
    {
        initialize(refiController,_rswap);
    }

  function defense() public {
    require(
      (eval.whitelisted(msg.sender)), //  make sure that the address is on our whiteList.
      "AUR_ERR" // aurthorisation error
    );
  }

    /// @notice This sets the initial values in the contract
    function initialize(address refiController,address _rswap) internal {
        
        RefiTroller = ComptrollerInterface(
            refiController
        );
        Exceth = CEth(0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5);  ///compund CEth
        Exoracle = IOracle(0x046728da7cb8272284238bD3e47909823d63A58D);  ///compund oracle
        ExCompTroller = ComptrollerInterface(
            0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B
        );
        Exvault = interfaceYieldVault(0xab7FA2B2985BCcfC13c6D86b1D5A17486ab1e04C);  /// Harvest Vault
        Expool = interfaceYieldPool(0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A);  ///  Harvest Pool
        Excdai = CErc20(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643);  /// Compound's DAI Token
        
        // Enter into Eth and Dai market on Compound
        address[] memory any = new address[](2);
        any[0] = address(Exceth);
        any[1] = address(Excdai);
        ExCompTroller.enterMarkets(any);


        harvestData.push();
        harvestIndex = 0;

        rswap = Irswap(_rswap); /// UniSwap Swap Router
    }
 
    // Eth receiving function and also use to redirect the call from proxies
    receive() external payable {
    }

    /**
     * @notice DAO Triggerable pause on 'repay/withdraw only'
     */
    function pause() external onlyOwner {
        _pause();
    }
    /**
     * @notice DAO Triggerable unpause on 'repay/withdraw only'
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    /**
     * @notice DAO Triggerable pause on all functions
     */
    function pauseAll() public onlyOwner {
        _pauseAll();
        _pause();
    }
    /**
     * @notice DAO Triggerable unpause on all functions
     */
    function unpauseAll() external onlyOwner {
        _unpauseAll();
        _unpause();
    }

    /**
     * @notice changes current refitroller
     * @param newCompt the address of new implementation
     */
    function changeAddresses(address newCompt, address newrs, address _eval, address _oracle, address _rswap) external onlyOwner {
        RefiTroller = ComptrollerInterface(newCompt);
        stabilityUserContract = newrs;
        eval = Ieval(_eval);
        rswap = Irswap(_rswap);
        Exoracle = IOracle(_oracle);
        emit refitrollerChanged(newCompt);
    }

    /**
     * @notice Commits Users and applies accrued interest to total Borrows
     * @param user Address of the user to be committed
     * @dev need to be called before any User operation
     */
    function _beforeEach(address user) internal whenNotPausedAll {
        accrueInterest();
        _commitUser(user, harvestIndex);
    }

    // function checkAddresses() external view returns(Ieval evaluator, IrSwap rSwap, address stabilityUser, IOracle oracle, ComptrollerInterface comptroller) {
    //     return (eval, rswap, stabilityUserContract, Exoracle, RefiTroller);
    // }

    /**
     * @notice Applies accrued interest to total borrows
     * @dev This calculates interest accrued from the last checkpointed block upto the current block and writes new checkpoint to storage.
     */
    function accrueInterest() public {
        
        (uint result, uint borrowIndex) = eval.accrueInterest();

        if (result == 0) return;
 
        totalUserBorrows.interestIndex = borrowIndex;
        totalUserBorrows.principal = result;
        emit raccrued(result, borrowIndex);
    }


    /**
     * @notice Evaluates current borrow balance of a user
     * @param user The address whose balance should be calculated
     * @return borrow balance of the user
     */
    function borrowBalanceCurrent(address user) 
        public 
        returns 
        (uint256) 
    {
        accrueInterest();
        accountBorrows[user].principal = borrowBalanceStored(user);
        accountBorrows[user].interestIndex = Excdai.borrowIndex();
        return accountBorrows[user].principal;
    }

    /**
     * @notice Return the borrow balance of user based on stored data
     * @param user The address whose balance should be calculated
     * @return The calculated balance
     */
    function borrowBalanceStored(address user)
        public
        view
        returns (uint256)
    {
        (MathError err, uint256 result) = borrowBalanceStoredInternal(user);
        require(
            err == MathError.NO_ERROR,
            "BBS_FAIL" //borrowBalanceStored: borrowBalanceStoredInternal failed
        );
        return result;
    }

    /**
     * @notice Return the borrow balance of user based on stored data
     * @param user The address whose balance should be calculated
     * @return (error code, the calculated balance or 0 if error code is non-zero)
     */
    function borrowBalanceStoredInternal(address user)
        internal
        view
        returns (MathError, uint256)
    {

        (, uint val) = eval.borrowBalanceStoredInternal(user);

        return (MathError.NO_ERROR, val);
    }

    /**
     * @notice Sender Supplies Eth and Receives Reth in return
     * @dev Accrues interest whether or not the operation succeeds, unless reverted
     */
    function deposit() external payable {
        defense();
        _beforeEach(msg.sender);
        _deposit(msg.sender, msg.value);
    }

    /**
     * @notice Sender Supplies Eth and Receives Reth in return
     * @param user The User Address Supplying Eth
     * @param amount Amount of Eth that User Supplied
     */
    function _deposit(address user, uint256 amount) internal {
        eval.depositCheck(user, amount);
        ///  Get vault balance of cETH
        uint256 vaultTokens = Exceth.balanceOf(address(this));
        Exceth.mint{value: amount}();

        uint256 vaultTokenIncrease = Exceth.balanceOf(address(this)) - vaultTokens;
   
        _mint(user, vaultTokenIncrease);

        emit deposited(user, amount, vaultTokenIncrease);
    }

    /**
     * @notice Sender redeems Rtokens in exchanges of unserlying asset
     * @param rAmount The amount of Ctokens to be Redeemed
     */
    function withdraw(uint256 rAmount) external {
        _beforeEach(msg.sender);
        _withdraw(msg.sender, rAmount);
    }

    /**
     * @notice Sender redeems Rtokens in exchanges of unserlying asset
     * @param rAmount The amount of Ctokens to be Redeemed
     * @param user The Account who wants to Redeem
     */
    function _withdraw(address user, uint256 rAmount) internal {
        uint256 shortfall = eval.withdrawCheck(user, rAmount);

        if (shortfall > 0) {
            uint256 daiBalance = dai.balanceOf(address(this));
            if(shortfall>daiBalance){
            _withdrawPool(shortfall - daiBalance);
            }
            dai.approve(address(Excdai), shortfall);
            require(Excdai.repayBorrow(shortfall)==uint(Error.NO_ERROR),'REP_ERR');
        }

        _burn(user, rAmount);
        uint256 amount = address(this).balance;
        require(Exceth.redeem(rAmount) == 0, "COMP_ERR");
        amount = address(this).balance-amount;
        
        (bool sent, ) = payable(user).call{value: amount}("");
        require(sent, "ETH_ERR"); //Failed to send Ether
        emit withdrawn(user, amount, rAmount);
    }


    /** 
     * @notice Function to withdraw specified amount from our Yieldfarm into the vault
     * @param amount amount to be withdrawn
     */
    function _withdrawPool(uint256 amount) internal {
        invested -= amount;
        uint256 amountf = ((amount ) * Exvault.totalSupply()) /
            Exvault.underlyingBalanceWithInvestment();
            amountf++;
        Expool.withdraw(amountf);
        Exvault.withdraw(amountf);
    }

    /**
     * @notice Initials a new Harvest if any of the condition is statisfied for more infomation refer Documentation
     */
    function harvest() external whenNotPaused {
        accrueInterest();
        eval.harvestCheck();
        lastHarvest = block.timestamp;
        uint256 amount = (Expool.balanceOf(address(this)) *
            Exvault.underlyingBalanceWithInvestment()) / Exvault.totalSupply();

        if(amount>=invested){
           amount = amount - invested;
           invested += amount;
        }else{
           amount=0;
        }

        /// RVS: Log the harvest
        _harvestCapture(_swap(comp), _swap(address(farm)) + amount);
        /// Track the harvest rewards for the stabilityUserContract (covering all users) and convert these to ETH (withdrawing if necessary)
        _commitUser(stabilityUserContract, harvestIndex);
        uint256 stabilityReward = userData[stabilityUserContract].rewards;
        if(stabilityReward > 1*10**17){
        uint256 daiBalance = dai.balanceOf(address(this));
        if (
            daiBalance <
            stabilityReward
        ) {
            _withdrawPool(
                stabilityReward -
                    daiBalance
            );
        }
        dai.approve(address(rswap), stabilityReward);
        uint256 amountEth = rswap.swapDaiforEth(
            stabilityReward
        );
        userData[stabilityUserContract].rewards = 0;
        userData[stabilityUserContract].lastRewards = 0;
        IWETH9(weth).withdraw(amountEth);
        _deposit(stabilityUserContract, amountEth);
        }
    }
    function _swap(address token) internal returns(uint){
        if(IERC20(token).balanceOf(address(this))>0){
        // RVS: Approve Uniswap to use token tokens
        IERC20(token).approve(
            address(rswap),
            IERC20(token).balanceOf(address(this))
        );

        /// RVS: Swap token tokens to DAI
        return rswap.swap(
            token,
            address(dai),
            IERC20(token).balanceOf(address(this))
        );
        }
        return 0;
    }


    /**
     * @notice Claim rewards from both the lender and yield protocols
     */
    function claimRewards() external {
        uint initialComp = IERC20(comp).balanceOf(address(this));
        uint initialFarm = farm.balanceOf(address(this));
        ExCompTroller.claimComp(address(this));
        Expool.getReward();
        emit claimedVault(
            block.timestamp,
            IERC20(comp).balanceOf(address(this))-initialComp,
            farm.balanceOf(address(this))-initialFarm
        );
    }


    /**
     * @notice Captures and stores data at the time of Harvest
     * @param comprewards The amount earned through lender protocol
     * @param farmrewards The amount earned through yield protocol
     */
    function _harvestCapture(uint256 comprewards, uint256 farmrewards) internal {
        (uint tLTV,,,,uint rsvFactor) = eval.store();
        uint rsvAmtOld;
        if(harvestIndex!=0){
            rsvAmtOld = harvestData[harvestIndex - 1].reserveAmount;
        }
        uint rsvAmt = (farmrewards * rsvFactor) /
                10**18;
        harvestData[harvestIndex] = harvestSnapshot({
            priceEthDai : (Exoracle.getUnderlyingPrice(address(Exceth))*10**18)/
            Exoracle.getUnderlyingPrice(address(Excdai)),
            lendingAmt: comprewards,
            yieldAmt: farmrewards-rsvAmt,
            supplyEth: Exceth.balanceOfUnderlying(address(this)),
            borrowIndex: Excdai.borrowIndex(),
            tLTV: tLTV,
            reserveAmount: rsvAmt+rsvAmtOld,
            exchangeRate: Exceth.exchangeRateCurrent(),
            totalBorrowsEth: totalUserBorrows.principal*10**18
                 /((Exoracle.getUnderlyingPrice(address(Exceth)) * 10**18) /
                 Exoracle.getUnderlyingPrice(address(Excdai)))
        });

        
        harvestData.push();
        emit harvested(
            harvestIndex,
            harvestData[harvestIndex].priceEthDai,
            comprewards,
            farmrewards-rsvAmt,
            harvestData[harvestIndex].supplyEth,
            tLTV,
            harvestData[harvestIndex].reserveAmount,
            harvestData[harvestIndex].exchangeRate,
            harvestData[harvestIndex].totalBorrowsEth
        );
        harvestIndex++;
    }


    /**
     * @notice Used by user to claim rewards on the protocol, only applicable if users' loan has been paid off
     */
    function claimUser() external {
        _beforeEach(msg.sender);
        uint256 amountTotal = userData[msg.sender].rewards -
            userData[msg.sender].lastRewards;
        userData[msg.sender].rewards = userData[msg.sender].lastRewards;
        if (dai.balanceOf(address(this)) < amountTotal) {
            _withdrawPool(amountTotal - dai.balanceOf(address(this)));
        }
        dai.transfer(msg.sender, amountTotal);
    }


    /**
     * @notice commits a list of users
     * @param userToCommit as an array of userAddresses to commit
     * @param tillHarvest index of harvest up to which the users should be committed
     */
    function commitUsers(address[] memory userToCommit, uint256 tillHarvest)
        external
    {
        accrueInterest();
        for (uint256 i = 0; i < userToCommit.length; i++) {
            if ( harvestIndex - userData[userToCommit[i]].uptillHarvest > 1 ) {
                _commitUser(userToCommit[i], tillHarvest);
          }
        }
    }


    /**
     * @notice commits a specific user
     * @param user address of user
     * @param tillH index of harvest up to which the user should be committed
     */
    function _commitUser(address user, uint256 tillH) internal {
        if (userData[user].uptillHarvest < tillH) {
            uint256 harvestLastReward = userData[user].rewards;
            (userData[user].rewards, userData[user].lastRewards) = eval.evalCommit(user, userData[user].uptillHarvest, tillH);
            userData[user].uptillHarvest = tillH;
            userData[user].rewards += harvestLastReward;
        }
        //Auto Repayment
        uint256 borrowBal = borrowBalanceCurrent(user);
        uint256 reward = userData[user].rewards - userData[user].lastRewards;
        if (borrowBal > 0) {
            if (
                reward >= borrowBal
            ) {
                userData[user].repaid += accountBorrows[user].principal;
                if (accountBorrows[user].principal > totalUserBorrows.principal) {
                    totalUserBorrows.principal = 0;
                }
                else totalUserBorrows.principal -= accountBorrows[user].principal;
                accountBorrows[user].principal = 0;
                userData[user].rewards -= borrowBal;

            } else {
                userData[user].repaid += reward;
                if (reward > totalUserBorrows.principal) {
                    totalUserBorrows.principal = 0;
                }
                else totalUserBorrows.principal -= reward;
                accountBorrows[user].principal -= reward;
                userData[user].rewards = userData[user].lastRewards;
            }
        }
    }


    /**
     * @notice function for user to borrow DAI in specified amount
     * @param amount amount of DAI to be borrowed
     */
    function borrow(uint256 amount) external whenNotPaused {
        _beforeEach(msg.sender);
        _borrow(msg.sender, amount);
    }

    /** 
     * @notice internal function to support _borrow
     * @param user  address of user requesting to borrow
     * @param amount amount of DAI to be borrowed
     */
    function _borrow(address user, uint256 amount) internal {
        (uint shortfallDai,) = eval.borrowCheck(user, amount);
        uint newAmount = amount-shortfallDai;
        if(shortfallDai>0){
            if(shortfallDai>dai.balanceOf(address(this))){
                _withdrawPool(shortfallDai);
            }
            
        }
        
        require(Excdai.borrow(newAmount)==uint256(Error.NO_ERROR),'COMP_ERR');

        //Store updates
        totalUserBorrows.principal += amount ;
        totalUserBorrows.interestIndex = Excdai.borrowIndex();
        accountBorrows[user].principal += amount ;
        accountBorrows[user].interestIndex = totalUserBorrows.interestIndex;
        dai.transfer(user, amount);
        emit borrowed(user,amount);
    }


    /** 
     * @notice takeLoan completes both a deposit & borrow function in one go
     * @param amountOut amount of DAI to be borrowed
     */
    function takeLoan(uint256 amountOut)
        external
        payable
        whenNotPaused
    {
        defense();
        _beforeEach(msg.sender);
        _deposit(msg.sender, msg.value);
        _borrow(msg.sender, amountOut);
    }


    /** 
     * @notice rebalance the vault to remain healthy
     */
    function rebalance() external whenNotPaused {
        accrueInterest();
        (uint tLTV,uint maxLTV,uint minLTV,uint min_depo,)= eval.store();
        uint256 currentLTV = eval.vaultLTV();
        uint256 bal = dai.balanceOf(address(this));
        //If current LTV is higher than max >= repay loan
        if (currentLTV >= maxLTV) {
            uint256 currentCollateral = (Exceth.balanceOfUnderlying(
                address(this)
             ) * Exoracle.getUnderlyingPrice(address(Exceth))) / Exoracle.getUnderlyingPrice(address(Excdai));   
            uint256 amountRequired = ((currentLTV - tLTV) *
                currentCollateral) / 10**18 ;

            if (amountRequired <= bal) {
                dai.approve(address(Excdai), amountRequired);
                require(Excdai.repayBorrow(amountRequired)==uint(Error.NO_ERROR),'REP_ERR');
            } else {
                amountRequired = amountRequired - dai.balanceOf(address(this));
                require(
                    (Expool.balanceOf(address(this)) *
                        Exvault.underlyingBalanceWithInvestment()) /
                        Exvault.totalSupply() >=
                        amountRequired,
                    "INSUFF_DEFI" //Insufficient money in defi protocol
                );
                _withdrawPool(amountRequired);
                dai.approve(address(Excdai), amountRequired);
                require(Excdai.repayBorrow(amountRequired)==uint(Error.NO_ERROR),'REP_ERR'); //repay failer
            }

        //If current LTV is lower than minimum -> take loan
        } else if (currentLTV <= minLTV) {
            uint256 currentCollateral = (Exceth.balanceOfUnderlying(
                address(this)
            ) * Exoracle.getUnderlyingPrice(address(Exceth))) / 10**18;
            //amount to borrow in DAI
            uint256 amountRequired = ((tLTV - currentLTV) *
                currentCollateral) / (10**18);

            require(Excdai.borrow(amountRequired)==uint(Error.NO_ERROR),'BOW_ERR');//Compound Borrow Failer
            bal += amountRequired;
        } 

        //If minimum deposite is greater than store deposite
        if (bal > min_depo) {
            dai.approve(address(Exvault), bal);
            Exvault.deposit(bal);
            invested += bal;
            _stake();
        } 
    }


    /** 
     * @notice stake yieldfarm tokens in the yieldfarm
     */
    function _stake() internal {
        uint256 amt = Exvault.balanceOf(address(this));
        Exvault.approve(address(Expool), amt);
        Expool.stake(amt);
    }


    /** 
     * @notice function for users to repay their loan
     */
    function repay(address user, uint256 amount) external {
        _beforeEach(user);
        _repay(msg.sender, user, amount);
    }


    /** 
     * @notice function for users to repay their Whole loan
     */
    function repayAll(address user) external {
        _beforeEach(user);
        _repay(msg.sender, user, accountBorrows[user].principal);
    }
    function _repay(
        address payer,
        address user,
        uint256 amount
    ) internal returns (uint256) {
        accountBorrows[user].principal -= amount;
        accountBorrows[user].interestIndex = Excdai.borrowIndex();
        if (amount > totalUserBorrows.principal) totalUserBorrows.principal = 0;
        else totalUserBorrows.principal -= amount;
        dai.transferFrom(payer, address(this), amount);
        emit repaid(user,accountBorrows[user].principal,amount);
        return amount;
    }


    /** 
     * @notice repay user loan and withdraw in the same transaction
     */
    function repaywithdraw(
        uint256 amount,
        uint256 rAmount
    ) external {
        _beforeEach(msg.sender);
        _repay(msg.sender, msg.sender, amount);
        _withdraw(msg.sender, rAmount);
    }


    /**
     * @notice function to liquidate a borrower if they are undercollateralised
     */
    function liquidateBorrow(address reciever, address borrower, uint256 repayAmount) external {
        (uint256 err, ) = liquidateBorrowInternal(reciever, borrower, repayAmount);
        require(uint256(Error.NO_ERROR) == err, "LIQ_ERR"); //error in liquidation
    }



    /** 
     * @notice internal function to liquidate a borrower
     */
    function liquidateBorrowInternal(address reciever, address borrower, uint256 repayAmount)
        internal
        nonReentrant
        returns (uint256, uint256)
    {
        accrueInterest();

        return liquidateBorrowFresh(reciever, borrower, repayAmount);
    }


    /**
     * @notice The liquidator liquidates the borrowers collateral. The collateral seized is transferred to the liquidator.
     * @param borrower The borrower of this rEth to be liquidated
     * @param liquidator The address repaying the borrow and seizing collateral
     * @param repayAmount The amount of the underlying borrowed asset to repay
     * @return (uint, uint) An error code (0=success, otherwise a failure, see ErrorReporter.sol), and the actual repayment amount.
     */
    function liquidateBorrowFresh(
        address liquidator,
        address borrower,
        uint256 repayAmount
    ) internal returns (uint256, uint256) {
        /* Fail if liquidate not allowed */
        uint256 allowed = RefiTroller.liquidateBorrowAllowed(
            address(this),
            address(this),
            liquidator,
            borrower,
            repayAmount
        );
        if (allowed != 0) {
            return (
                failOpaque(
                    Error.COMPTROLLER_REJECTION,
                    FailureInfo.LIQUIDATE_COMPTROLLER_REJECTION,
                    allowed
                ),
                0
            );
        }

        /* Fail if borrower = liquidator */
        if (borrower == liquidator) {
            return (
                fail(
                    Error.INVALID_ACCOUNT_PAIR,
                    FailureInfo.LIQUIDATE_LIQUIDATOR_IS_BORROWER
                ),
                0
            );
        }

        /* Fail if repayAmount = 0 */
        if (repayAmount == 0) {
            return (
                fail(
                    Error.INVALID_CLOSE_AMOUNT_REQUESTED,
                    FailureInfo.LIQUIDATE_CLOSE_AMOUNT_IS_ZERO
                ),
                0
            );
        }

        /* Fail if repayAmount = UnLimited */
        if (repayAmount == ~uint256(0)) {
            return (
                fail(
                    Error.INVALID_CLOSE_AMOUNT_REQUESTED,
                    FailureInfo.LIQUIDATE_CLOSE_AMOUNT_IS_UINT_MAX
                ),
                0
            );
        }

        /* Fail if repayBorrow fails */
        uint256 actualRepayAmount = _repay(liquidator, borrower, repayAmount);

        /*Calculate the number of collateral tokens that will be seized */
        (uint256 amountSeizeError, uint256 seizeTokens) = RefiTroller
            .liquidateCalculateSeizeTokens(
                address(Excdai),
                address(Exceth),
                actualRepayAmount
            );
        require(
            amountSeizeError == uint256(Error.NO_ERROR),
            "LIQ01" //LIQUIDATE_COMPTROLLER_CALCULATE_AMOUNT_SEIZE_FAILED
        );

        /* Revert if borrower collateral token balance < seizeTokens */
        require(
            this.balanceOf(borrower) >= seizeTokens,
            "LIQ02"//LIQUIDATE_SEIZE_TOO_MUCH
        );

        // If this is also the collateral, run seizeInternal to avoid re-entrancy, otherwise make an external call
        uint256 seizeError = seizeInternal(liquidator, borrower, seizeTokens);

        /* Revert if seize tokens fails (since we cannot be sure of side effects) */
        if (seizeError != uint256(Error.NO_ERROR)) {
            return (seizeError, 0);
        }
        return (uint256(Error.NO_ERROR), actualRepayAmount);
    }



    /**
     * @notice Transfers collateral tokens to the liquidator(rETH).
     * @param liquidator The user(rETH) receiving seized collateral
     * @param borrower The user having collateral seized
     * @param seizeTokens The number of rEth to seize
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function seizeInternal(
        address liquidator,
        address borrower,
        uint256 seizeTokens
    ) internal returns (uint256) {
        /* Fail if seize not allowed */
        uint256 allowed = RefiTroller.seizeAllowed(
            address(this),
            address(this),
            liquidator,
            borrower,
            seizeTokens
        );
        if (allowed != 0) {
            return allowed;
        }

        /* Fail if borrower = liquidator */
        if (borrower == liquidator) {
            return (
                fail(
                    Error.INVALID_ACCOUNT_PAIR,
                    FailureInfo.LIQUIDATE_LIQUIDATOR_IS_BORROWER
                )
            );
        }

        uint256 incentive = RefiTroller.liquidationIncentiveMantissa();
        uint256 val = ((incentive - 10**18) * seizeTokens) / incentive;
        userCSupply[borrower] = userCSupply[borrower] - seizeTokens;
        seizeTokens -= val;
        userCSupply[liquidator] += seizeTokens;
        userCSupply[stabilityUserContract] += val;
        return uint256(Error.NO_ERROR);
    }



    /**
    * @notice function to get a snapshot of the users user
    * @param user user for who we want to get the information
    * @return (error, rTokenbalance, borrowBalance, exchangerateMantissa)
     */
    function getAccountSnapshot(address user)
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 borrowBalance;

        MathError mErr;

        (mErr, borrowBalance) = borrowBalanceStoredInternal(user);
        if (mErr != MathError.NO_ERROR) {
            return (uint256(Error.MATH_ERROR), 0, 0, 0);
        }

        return (
            uint256(Error.NO_ERROR),
            userCSupply[user],
            borrowBalance,
            Exceth.exchangeRateStored()
        );
    }


    /**
    * @notice function to get reserve rewards from the harvest
     */
    function claimReserve(uint rAmount) external onlyOwner {
        harvestData[harvestIndex - 1].reserveAmount -= rAmount;
        if (dai.balanceOf(address(this)) < rAmount) {
            _withdrawPool(rAmount - dai.balanceOf(address(this)));
        }
        dai.transfer(msg.sender, rAmount);
    }

 
    /**
    * @notice function of emergency withdraw if there will be any oracle mismatch
     */
    function emergencyWithdraw() external {
        rswap.oracleMismatch();
        //withdraw all funds from harvest
        uint fdai = Expool.balanceOf(address(this));
        Expool.withdraw(fdai);
        Exvault.withdraw(fdai);
        //partially repay compound
        uint amt = eval.repayEmergency();
        dai.approve(address(Excdai), amt);
        require(Excdai.repayBorrow(amt)==uint(Error.NO_ERROR),'EREP_ERR');
        _pauseAll();
        _pause();
    }
}
