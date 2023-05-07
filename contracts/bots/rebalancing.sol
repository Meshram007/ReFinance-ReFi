// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface Ieval{
    function borrowCheck(address user,uint amount) external view returns (uint,uint);

    function vaultLTV() external returns(uint);

    function withdrawCheck(address account,uint cAmount) external returns (uint);

    function evalCommit(address user,uint initialH, uint finalH) external view returns (uint rewards,uint lastRewards);

    function harvestCheck() external view returns(bool);

    function depositCheck(address user,uint amount) external;

    function store() external view returns (uint,uint,uint,uint,uint);
}
interface ICTokenStorage {
    function accrualBlockNumber() external view returns(uint);
    function getCash() external view returns (uint);
    function totalBorrows() external view returns(uint);
    function totalReserves() external view returns(uint);
    function borrowIndex() external view returns(uint);
    function reserveFactorMantissa() external view returns(uint);
    }
    
interface IInterestRateModel {
    function getBorrowRate(uint cash, uint borrows, uint reserves) external view returns (uint);
    function getSupplyRate(uint cash, uint borrows, uint reserves, uint reserveFactorMantissa) external view returns (uint);
}

interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
interface IOracle{
    function getUnderlyingPrice(address cToken) external view returns (uint);
}

interface CErc20 is ICTokenStorage {
    function mint(uint256) external returns (uint256);

    function borrow(uint256) external returns (uint256);

    function borrowRatePerBlock() external view returns (uint256);

    function repayBorrow(uint256) external returns (uint256);

    function redeem(uint) external returns (uint);

    function redeemUnderlying(uint) external returns (uint);

    function borrowBalanceCurrent(address account) external returns (uint);

    function balanceOfUnderlying(address account) external returns (uint);

    function exchangeRateCurrent() external returns (uint);
    function borrowBalanceStored(address) external view returns (uint);
}

interface interfaceVault {
    function underlyingBalanceInVault() external view returns (uint256);

    function underlyingBalanceWithInvestment() external returns (uint256);

    function governance() external view returns (address);

    function controller() external view returns (address);

    function underlying() external view returns (address);

    function strategy() external view returns (address);

    function setStrategy(address _strategy) external;

    function setVaultFractionToInvest(uint256 numerator, uint256 denominator)
        external;

    function deposit(uint256 amountWei) external;

    function depositFor(uint256 amountWei, address holder) external;

    function withdrawAll() external;

    function withdraw(uint256 numberOfShares) external;

    function getPricePerFullShare() external returns (uint256);

    function underlyingBalanceWithInvestmentForHolder(address holder)
        external
        returns (uint256);

    // hard work should be callable only by the controller (by the hard worker) or by governance
    function doHardWork() external;

    function rebalance() external;
}

interface interfacePool {
    // stake funds
    function stake(uint256 amount) external;

    //Unstake funds
    function withdraw(uint256 amount) external;

    //Rewards
    function getReward() external;

    function exit() external; //exit from Expool and withdraw all along with this, get rewards

    //the rewards should be first transferred to this Expool, then get "notified" by calling `notifyRewardAmount`
    function notifyRewardAmount(uint256 reward) external;

    function migrate() external;
}

interface ComptrollerInterface {
    /**
     * @notice Marker function used for light validation when updating the comptroller of a market
     * @dev Implementations should simply return true.
     * @return true
     */
    function isComptroller() external view returns (bool);

    function getAccountLiquidity(address account) external view returns (uint, uint, uint);
    function claimComp(address holder) external;
    /*** Assets You Are In ***/

    function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);
    function exitMarket(address cToken) external returns (uint);

    /*** Policy Hooks ***/

    function mintAllowed(address cToken, address minter, uint mintAmount) external returns (uint);
    function mintVerify(address cToken, address minter, uint mintAmount, uint mintTokens) external;

    function redeemAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);
    function redeemVerify(address cToken, address redeemer, uint redeemAmount, uint redeemTokens) external;

    function borrowAllowed(address cToken, address borrower, uint borrowAmount) external returns (uint);
    function borrowVerify(address cToken, address borrower, uint borrowAmount) external;

    function repayBorrowAllowed(
        address cToken,
        address payer,
        address borrower,
        uint repayAmount) external returns (uint);
    function repayBorrowVerify(
        address cToken,
        address payer,
        address borrower,
        uint repayAmount,
        uint borrowerIndex) external;

    function liquidateBorrowAllowed(
        address cTokenBorrowed,
        address cTokenCollateral,
        address liquidator,
        address borrower,
        uint repayAmount) external returns (uint);
    function liquidateBorrowVerify(
        address cTokenBorrowed,
        address cTokenCollateral,
        address liquidator,
        address borrower,
        uint repayAmount,
        uint seizeTokens) external;

    function seizeAllowed(
        address cTokenCollateral,
        address cTokenBorrowed,
        address liquidator,
        address borrower,
        uint seizeTokens) external returns (uint);
    function seizeVerify(
        address cTokenCollateral,
        address cTokenBorrowed,
        address liquidator,
        address borrower,
        uint seizeTokens) external;

    function transferAllowed(address cToken, address src, address dst, uint transferTokens) external returns (uint);
    function transferVerify(address cToken, address src, address dst, uint transferTokens) external;

    /*** Liquidity/Liquidation Calculations ***/

    function liquidateCalculateSeizeTokens(
        address cTokenBorrowed,
        address cTokenCollateral,
        uint repayAmount) external view returns (uint, uint);
}

interface CEth {
    function mint() external payable;

    function balanceOf(address) external view returns (uint);

    function borrow(uint256) external returns (uint256);

    function repayBorrow() external payable;

    function borrowBalanceCurrent(address) external returns (uint256);

    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);

    function redeem(uint256 redeemTokens) external returns (uint256);

    function balanceOfUnderlying(address account) external view returns (uint256);

    function exchangeRateStored() external view returns (uint256);
    
    function totalSupply() external view returns(uint);
    
    function getCash() external view returns (uint); 
    
    function totalBorrows() external view returns(uint);
    
    function totalReserves() external view returns(uint);
    
    function reserveFactorMantissa() external view returns(uint);
    
    function accrualBlockNumber() external view returns(uint);
    
    function borrowBalanceStored(address) external view returns(uint);
    
    function borrowIndex() external view returns(uint);
}

interface ICounter {
    function rebalance() external;
}

contract rebalanceResolver  {
    address public immutable reth;
    //uint min_depo; 
    CErc20 cDai;
    IERC20 Dai; 
    interfaceVault Exvault;
    IOracle oracle;
    interfacePool Expool;
    ComptrollerInterface CompTroller;
    IInterestRateModel interestRateModelDai;
    IInterestRateModel interestRateModelEth;
    CEth Exceth;
    Ieval eval;

    
    //Set maximum, minimum and target LTV for the Vault
    //Store public store;
    
    constructor(address _reth,address _eval) {
        reth = _reth;
        Dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
        CompTroller = ComptrollerInterface(0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B);
        oracle = IOracle(0x046728da7cb8272284238bD3e47909823d63A58D);
        cDai = CErc20(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643);
        interestRateModelDai = IInterestRateModel(0xFB564da37B41b2F6B6EDcc3e56FbF523bD9F2012);
        interestRateModelEth = IInterestRateModel(0x0C3F8Df27e1A00b47653fDE878D68D35F00714C0);
        Exceth = CEth(0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5);
        Exvault = interfaceVault(0xab7FA2B2985BCcfC13c6D86b1D5A17486ab1e04C);
        Expool = interfacePool(0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A);
        eval = Ieval(_eval);
        //store.maxLTV = 7*10**17; // 0.7
    }
    
    function resultCheck() public view returns (uint){
        uint accrualBlockNumber = cDai.accrualBlockNumber();
        uint borrowBalanceStored = cDai.borrowBalanceStored(reth);
        uint getCashPrior = cDai.getCash();
        uint totalBorrowsPrior = cDai.totalBorrows();
        uint totalReservesPrior = cDai.totalReserves();
        uint borrowIndexPrior = cDai.borrowIndex();
        uint currentBlockNumber = block.number;
        uint borrowRateMantissa = interestRateModelDai.getBorrowRate(getCashPrior, totalBorrowsPrior, totalReservesPrior);
        uint blockDelta = currentBlockNumber - accrualBlockNumber;
        uint simpleInterestFactor = borrowRateMantissa * blockDelta;
        uint borrowIndexNew = ((simpleInterestFactor * borrowIndexPrior)/ 10**18 + borrowIndexPrior) ;
        uint principalTimesIndex = borrowBalanceStored * borrowIndexNew;
        uint result = principalTimesIndex / borrowIndexPrior;
        return result;
    }

    function balanceOfUnderlying() public view returns(uint) {
        uint borrowRateMantissa = interestRateModelEth.getBorrowRate(Exceth.getCash(), Exceth.totalBorrows(), Exceth.totalReserves());
        uint blockDelta = block.number - Exceth.accrualBlockNumber();
        uint simpleInterestFactor = borrowRateMantissa * blockDelta;
        
        uint reserveFactorMantissa = Exceth.reserveFactorMantissa();


        uint interestAccumulated = (simpleInterestFactor * Exceth.totalBorrows()) /10**18;
        uint totalBorrowsNew = Exceth.totalBorrows() + interestAccumulated;
        uint totalReservesNew = ((reserveFactorMantissa * interestAccumulated) + Exceth.totalReserves()); 
        uint totalSupply = Exceth.totalSupply();
        uint accountTokens = Exceth.balanceOf(reth);
        uint cashPlusBorrowsMinusReserves = ((Exceth.getCash() + totalBorrowsNew ) - totalReservesNew);
        uint exchangeRate = (cashPlusBorrowsMinusReserves / totalSupply);
        uint balance = (exchangeRate * accountTokens);
        return balance;
    }
    
    function vaultLTVmantissa() public view returns (uint256) {
        uint256 priceInEth = (oracle.getUnderlyingPrice(address(Exceth)) *
        balanceOfUnderlying()) / oracle.getUnderlyingPrice(address(cDai));
        uint vaultLtv = (resultCheck() * 10**18) / (priceInEth);
        return vaultLtv;
    }

    function checker() external view returns (bool canExec, bytes memory execPayload)
    {
        canExec;
        uint bal = Dai.balanceOf(reth);
        uint256 currentLTV = vaultLTVmantissa();
        (,uint maxLTV,uint minLTV,uint min_depo,) = eval.store();
         if (currentLTV >= maxLTV) {
                canExec = true;
        } 
        
        if (currentLTV <= minLTV) {
            canExec = true;
        } 
        
        if (bal > min_depo) {
            canExec = true ; 
        } 
        execPayload = abi.encodeWithSelector(ICounter.rebalance.selector);
        return (canExec, execPayload);
    }
}
