//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Interfaces/ComptrollerInterface8.sol";
import "./inherited/ErrorReporter8.sol";
import "./Interfaces/compound/Ioracle.sol";
import "./tokenHelpers/openzeppelin/IERC20.sol";
import "./Interfaces/Ievaluator.sol";
import "./utils/openzeppelin/Ownable.sol";
import "./Interfaces/Irswap.sol";

/**
 * @notice interface of the possible errors
 */
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

/**
 * @notice Combined interface of CEth and CDai
 */
interface CErc20 is error {
    function borrowBalanceCurrent(address user) external returns (uint256);

    function balanceOfUnderlying(address user) external returns (uint256);

    function exchangeRateCurrent() external returns (uint256);

    function borrowIndex() external view returns(uint256);

    function accrueInterest() external returns (uint256);
}

/**
 * @notice Container for Harvest Information
 * @member priceEthDai Conversion factor from Eth to Dai
 * @member lendingAmt amount of profit obtained from lender protocol
 * @member yieldAmt amount of profit earned from Yield protocol
 * @member supplyEth Total Eth supplied to the lender
 * @member blockNo block number at the time of harvest
 * @member tLTV target LTV of Vault at the time of Harvest
 * @member reserveAmount reserve Factor of the Vault at the time of harvest
 * @member exchangeRate the factor which multiplies with cEth to give Eth amount (scaled to 10^18)
 * @member totalBorrowsEth total borrow Amount taken by the users
 */
struct HarvestSnapshot {
    uint256 priceEth;
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
 * @notice Container for borrow balance information
 * @member principal Total balance (with accrued interest), after applying the most recent balance-changing action
 * @member interestIndex Global borrowIndex as of the most recent balance-changing action
 */
struct BorrowSnapshot {
    uint256 principal;
    uint256 interestIndex;
}

/**
 * @notice interfaces of the rETH contract
 */
interface Ireth is IERC20 {
    function harvestData(uint256 index)
        external
        view
        returns (HarvestSnapshot memory);

    function accountBorrows(address user)
        external
        view
        returns (BorrowSnapshot memory);

    function totalUserBorrows()
        external
        view
        returns (BorrowSnapshot memory);

    function lastHarvest() external view returns (uint256);
}

/**
 * @title Extends rETH contract functionality
 * @author Refi
 **/
contract evaluator is TokenErrorReporter, Ownable, Ieval {
    uint256 public vaultLTVStored;
    ComptrollerInterface public immutable RefiTroller;
    address public immutable reth;
    address public immutable stabilityContract;

    ComptrollerInterface ExCompTroller =
        ComptrollerInterface(0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B);
    IOracle Exoracle = IOracle(0x046728da7cb8272284238bD3e47909823d63A58D);
    CErc20 ExcDAI = CErc20(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643);
    CErc20 Exceth = CErc20(0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5);
    
    /// @notice address of Compound's Comp Tokens
    address constant comp = 0xc00e94Cb662C3520282E6f5717214004A7f26888;
    /// @notice Instance of Harvest.finance's FARM token
    address constant farm = (0xa0246c9032bC3A600820415aE600c6388619A14D);
    /// @notice Instance of DAI token
    address constant dai = (0x6B175474E89094C44Da98b954EedeAC495271d0F);

    /**
     * @notice Container for Harvest triggers
     * @member minCompDAI DAI value of COMP tokens required to allow harvest
     * @member minFarmDAI DAI value of FARM tokens required to allow harvest
     */
    struct HarvestTriggers {
        uint256 minTime;
        uint256 minCompDAI; //DAI value of COMP tokens required to allow harvest
        uint256 minFarmDAI; //DAI value of FARM tokens required to allow harvest
    }

    //Variable of the harvestTriggers
    HarvestTriggers public harvestTriggers;

    //variable of rswap for RefiSwap contract instances
    Irswap public rswap;

    /**
     * @notice Container for Deposit Restrictions
     * @member userMaxSupply maximum amount of the user can supply to the vault
     * @member vaultMaxSupply maximum limit of Refi vault
     * @member stabilityMaxSupply maximum amount of the stability users can supply to the pool
     */
    struct DepositRestrictions {
        uint256 userMaxSupply;
        uint256 vaultMaxSupply;
        uint256 stabilityMaxSupply;
    }

    DepositRestrictions public depositRestrictions;

    /// used in the bots for various checks like liquidation
    mapping(address => bool) interacted;
    struct Store {
        uint256 tLTV;
        uint256 maxLTV;
        uint256 minLTV;
        uint256 min_depo;
        uint256 reserveFactor;
    }
    //Set maximum, minimum and target LTV for the Vault
    Store public override store;

    address[] public users;

    mapping(address => bool) public usersWhitelisted;

    bool whitelistEnabled = true;

    modifier onlyReth {
        require(msg.sender == reth, "Not reth");
        _;
    }

    event ConfigUpdated(
        uint256 tLTV,
        uint256 maxLTV,
        uint256 minLTV,
        uint256 minimum_deposit_Harvest,
        uint256 reserveFactor
    );

    event Whitelisted(address newContractAddress);
    event WhitelistStatus(bool value);
    constructor(
        address _reth,
        address _controller,
        address _rswap,
        address _stabilityContract
    ) {
        reth = _reth;
        rswap = Irswap(_rswap);
        RefiTroller = ComptrollerInterface(_controller);
        stabilityContract = _stabilityContract;

        harvestTriggers = HarvestTriggers({
            minTime: 500,
            minCompDAI: 1 * 10**18,
            minFarmDAI: 1 * 10**18
        });
        depositRestrictions = DepositRestrictions({
            userMaxSupply: 100 * 10**18,
            vaultMaxSupply: 250 * 10**18,
            stabilityMaxSupply: 150 * 10**18
        });
        store = Store({
            tLTV: 55 * 10**16, // 0.55
            maxLTV: 6 * 10**17, // 0.6
            minLTV: 5 * 10**17, //0.5
            min_depo: 10 * 10**18, // 10 DAI
            reserveFactor: 10**16 //1%
        });
        usersWhitelisted[_stabilityContract] = true;
    }

    function usersLength() external view returns (uint256) {
        return users.length;
    }
    
    function getUsers() external view returns(address[] memory) {
        return users;
    }

    function oracleAddress() public view returns(address) {
        return address(Exoracle);
    }

   /**
     * @notice changes oracle address
     * @param newAddres the address of new implementation
     */
    function setOracle(address newAddres) external onlyOwner {
       Exoracle = IOracle(newAddres);
    }

    function doWhitelist(address newAddress) external onlyOwner {
        usersWhitelisted[newAddress] = true;
        emit Whitelisted(newAddress);
    }

    function whitelisted(address user) external view override returns(bool){
        if(whitelistEnabled == false){
            return true;
        }else{
            return usersWhitelisted[user];
        }
    }

    function switchWhitelist(bool value) external onlyOwner {
        whitelistEnabled = value;
        emit WhitelistStatus(value);
    }

    /**
     * @notice Sets the values of LTVs
     * @param tLTV target LTV of Vault, This is the LTV we want the Vault to hold at maximum times
     * @param maxLTV Maximum value of LTV, If vaultLTV exceeds this value, Rebalance needs to be triggered
     * @param minLTV Minimum value of LTV, If vaultLTV preceeds this value, Rebalance needs to be triggered
     * @dev RVS - to limit the protocol size for MVP where will we be able to configure a) max supply per user b) max supply overall?
     */
    function setConfig(
        uint256 tLTV,
        uint256 maxLTV,
        uint256 minLTV,
        uint256 min_depo,
        uint256 reserveFactor
    ) external onlyOwner {
        store = Store({
            tLTV: tLTV,
            maxLTV: maxLTV,
            minLTV: minLTV,
            min_depo: min_depo,
            reserveFactor: reserveFactor
        });
        emit ConfigUpdated(tLTV, maxLTV, minLTV, min_depo, reserveFactor);
    }

    /**
     * @notice function to change the harvest triggers
     * @param newTime set the new minimum time to harvest
     * @param _minCompUSD set new DAI value of COMP tokens required to allow harvest
     * @param _minCompUSD set new DAI value of FARM tokens required to allow harvest
     **/
    function changeHarvestTriggers(
        uint256 newTime,
        uint256 _minCompUSD,
        uint256 _minFarmUSD
    ) external {
        require(msg.sender == owner(), "Not Authorised");
        harvestTriggers = HarvestTriggers({
            minTime: newTime,
            minCompDAI: _minCompUSD,
            minFarmDAI: _minFarmUSD
        });
    }

    /**
     * @notice function to change the deposite resitrictions parameters
     * @param userMaxSupply set the new minimum time to harvest
     * @param vaultMaxSupply set maximum limit of Refi vault
     * @param stabilityMaxSupply set new stabilityMaxSupply maximum amount of the stability users can supply to the pool
     **/
    function changeDepositRestrictions(
        uint256 userMaxSupply,
        uint256 vaultMaxSupply,
        uint256 stabilityMaxSupply
    ) external onlyOwner {
        depositRestrictions = DepositRestrictions({
            userMaxSupply: userMaxSupply,
            vaultMaxSupply: vaultMaxSupply,
            stabilityMaxSupply: stabilityMaxSupply
        });
    }

    /**
     * @notice checks if a borrow is allowed to be made by a specific user
     * @param user users address
     * @param amount amount the user wants to borrow
     **/
    function borrowCheck(address user, uint256 amount)
        external
        view
        override
        returns (uint256, uint256)
    {
        uint256 allowed = RefiTroller.borrowAllowed(reth, user, amount);
        if (allowed != uint256(Error.NO_ERROR)) {
            revert("INSUFF_EVAL");
        }

        (uint256 err, uint256 liquidity, uint256 shortfall) = ExCompTroller
            .getAccountLiquidity(reth);
        require(
            err == 0,
            "Error in confirming if sufficient liquidity is available"
        );

        if (shortfall > 0) {
            return (
                shortfall / Exoracle.getUnderlyingPrice(address(ExcDAI)),
                0
            );
        }
        uint256 price = Exoracle.getUnderlyingPrice(address(ExcDAI));
        if (((liquidity * 10**18) / price) < amount) {
            return (amount - ((liquidity * 10**18) / price), 0);
        }
        return (0, liquidity);
    }

    function borrowBalanceStoredInternal(address user)
        external
        view
        override
        returns (MathError, uint256)
    {
        /* Note: we do not assert that the market is up to date */
        uint256 principalTimesIndex;

        /* Get borrowBalance and borrowIndex */
        BorrowSnapshot memory borrowSnapshot = Ireth(reth).accountBorrows(user);

        /* If borrowBalance = 0 then borrowIndex is likely also 0.
         * Rather than failing the calculation with a division by 0, we immediately return 0 in this case.
         */
        if (borrowSnapshot.principal == 0) {
            return (MathError.NO_ERROR, 0);
        }

        /* Calculate new borrow balance using the interest index:
         *  recentBorrowBalance = borrower.borrowBalance * market.borrowIndex / borrower.borrowIndex
         */
        principalTimesIndex = borrowSnapshot.principal * ExcDAI.borrowIndex();

        return (MathError.NO_ERROR, (principalTimesIndex / borrowSnapshot.interestIndex));
    }

    function accrueInterest() external override onlyReth returns(uint result, uint borrowIndex) {
        ///accrue interest on the lender DAI token
        uint256 err = ExcDAI.accrueInterest();
        if (err != uint256(Error.NO_ERROR)) {
            // accrueInterest emits logs on errors, but we still want to log the fact that an attempted liquidation failed
            revert('COMP_ERR'); //Compound accrue error
        }
        
        uint256 principalTimesIndex;
        borrowIndex = ExcDAI.borrowIndex();

        BorrowSnapshot memory totalUserBorrows = Ireth(reth).totalUserBorrows();

        if (totalUserBorrows.principal == 0) {
            return(0,0);
        }

        /* Calculate new user borrow balance using the interest index:
         *  recentBorrowBalance = borrower.borrowBalance * market.borrowIndex / borrower.borrowIndex
         */
        principalTimesIndex = totalUserBorrows.principal * borrowIndex;

        result = (principalTimesIndex / totalUserBorrows.interestIndex);

        return (result, borrowIndex);
    }
    
    /**
     * @notice : Get the loan to value of vault
     * @return : uint mantissa of loan to value
     */
    function vaultLTV() external override returns (uint256) {
        uint256 priceInDai = (Exoracle.getUnderlyingPrice(address(Exceth)) *
            Exceth.balanceOfUnderlying(reth)) /
            Exoracle.getUnderlyingPrice(address(ExcDAI));
        vaultLTVStored =
            (ExcDAI.borrowBalanceCurrent(reth) * 10**18) /
            (priceInDai);
        return vaultLTVStored;
    }

    /**
     * @notice check if the user is allowed to withdraw the requested amount and return vault shortfall if so
     * @param user user for who the check should be performed
     * @param rAmount in cETH requested to withdraw
     * @return uint with vault shortfall or reverts if the user doesn't have enough funds to support transaction
     */
    function withdrawCheck(address user, uint256 rAmount)
        external
        override
        returns (uint256)
    {
        uint256 err = RefiTroller.redeemAllowed(reth, user, rAmount);

        /// If the user is allowed to withdraw, check if the vault has enough liquidity to withdraw
        if (err == uint256(Error.NO_ERROR)) {
            uint256 err2;
            uint256 shortfall;
            (err2, , shortfall) = ExCompTroller.getHypotheticalAccountLiquidity(
                reth,
                address(Exceth),
                rAmount,
                0
            );
            require(err2 == uint256(Error.NO_ERROR), "Error From Compound");
            return
                (shortfall * 10**18) /
                Exoracle.getUnderlyingPrice(address(ExcDAI));
        }
        revert("Withdraw not allowed");
    }

    /**
     * @notice Calculate how much will be distributed to the user from a range of harvests
     * @param user address of the user to commit
     * @param initialH first harvest to include in the evaluation
     * @param finalH last harvest to include in the evaluation
     * @return rewards returns the amount due to the user in total as well as from the last harvest (lastRewards)
     */
    function evalCommit(
        address user,
        uint256 initialH,
        uint256 finalH
    ) external view override returns (uint256 rewards, uint256 lastRewards) {
        //BorrowSnapshot of the user (principal & interestIndex) from the reth contract
        BorrowSnapshot memory borrowData = Ireth(reth).accountBorrows(user);
        uint256 rewardsTotal;
        uint256 lastrewards;
        uint256 bal = Ireth(reth).balanceOf(user);

        for (uint256 i = initialH; i < finalH; i++) {
            HarvestSnapshot memory lastHarvest = Ireth(reth).harvestData(i);
            if (lastHarvest.supplyEth == 0) {
                continue;
            }
            //dLender = "Harvest Lender Profit in ETH (converted from DAI)" * "User Bal in ETH" / "Harvest Supply in ETH"=
            uint256 dLender = (lastHarvest.lendingAmt *
                (bal * lastHarvest.exchangeRate)/10**18) / lastHarvest.supplyEth;
            uint256 denom = ((lastHarvest.supplyEth * lastHarvest.tLTV) / 10**18) - lastHarvest.totalBorrowsEth;

            uint256 num;

            // If the user has active yield ( loan < supply * tLTV) then execute the following
            if (((borrowData.principal * 10**18) / lastHarvest.priceEth) <= ((((bal * lastHarvest.exchangeRate) / 10**18) * lastHarvest.tLTV) / 10**18)) {

                // Calculate harvest distribution
                // HarvestYield * ( UserSupply * HarvestTLTV ) - UserLoan / ( VaultSupply * HarvestTLTV ) - VaultBorrows 
                // If the user has borrowed funds then include borrowed amount
                if (borrowData.principal > 0) {                    
                    num = (lastHarvest.yieldAmt * ((((bal * lastHarvest.exchangeRate) / 10**18) * lastHarvest.tLTV) /
                            10**18 - ((((borrowData.principal * lastHarvest.borrowIndex)* 10**18 / borrowData.interestIndex)) / lastHarvest.priceEth)));
                } else {
                    num = (lastHarvest.yieldAmt * ((((bal * lastHarvest.exchangeRate) / 10**18) * lastHarvest.tLTV) / 10**18  / lastHarvest.priceEth));    
                }
                num = num / (denom);
            }
            
            lastrewards =  dLender+num;
            rewardsTotal += lastrewards;
        }
        return (rewardsTotal, lastrewards);
    }

    /**
     * @notice function to check harvest allowed or not in the rETH contract
     * @notice reverts if harvest not allowed
     */
    function harvestCheck() external view override {
        uint256 compRewardsDAI = rswap.minOut(
            IERC20(comp).balanceOf(address(reth)),
            comp,
            dai
        );
        uint256 farmRewardsDAI = rswap.minOut(
            IERC20(farm).balanceOf(address(reth)),
            farm,
            dai
        );

        if (
            Ireth(reth).lastHarvest() + harvestTriggers.minTime <=
            block.timestamp ||
            compRewardsDAI >= harvestTriggers.minCompDAI ||
            farmRewardsDAI >= harvestTriggers.minFarmDAI
        ) {
            return;
        }else{
            revert('HARV_ERR');
        }
    }

    /**
     * @notice check if the user is allowed to deposite the requested amount
     * @param user address of the user who deposite
     * @param amount amount of the Eth user want to deposite
     */
    function depositCheck(address user, uint256 amount) external override {
        uint256 exchangeRate = Exceth.exchangeRateCurrent();
        uint256 individualRestriction = depositRestrictions.userMaxSupply;
        if (user == stabilityContract) {
            individualRestriction = ~uint256(0);
            require(
                (Ireth(reth).balanceOf(user) * exchangeRate) /
                    10**18 +
                    amount <=
                    depositRestrictions.stabilityMaxSupply,
                "LIM02"
            ); // Stability vault limit exceeded
        }

        require(
            (Ireth(reth).balanceOf(user) * exchangeRate) / 10**18 + amount <=
                individualRestriction,
            "LIM00"
        ); //USER LIMIT Exceeded

        require(
            (Ireth(reth).totalSupply() * exchangeRate) / 10**18 + amount <
                depositRestrictions.vaultMaxSupply,
            "LIM01"
        );

        if (interacted[user] == false) {
            users.push(user);
            interacted[user] = true;
        }
    }

    function repayEmergency() external override returns (uint){
        if(ExcDAI.borrowBalanceCurrent(address(reth))/2<IERC20(dai).balanceOf(address(reth))){
            return ExcDAI.borrowBalanceCurrent(address(reth))/2;
        }
        return IERC20(dai).balanceOf(address(reth));
    }

}