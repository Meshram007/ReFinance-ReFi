// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Uniswap components
import './uniswap/UniswapV2Library.sol';
import "./uniswap/IUniswapV2Factory.sol";
import "./uniswap/IUniswapV2Router02.sol";
import "./uniswap/IUniswapV2Callee.sol";
import "./uniswap/IUniswapV2Pair.sol";

interface ComptrollerInterface {
    function closeFactorMantissa() external view returns(uint);
    function liquidateBorrowAllowed(address cTokenBorrowed, address cTokenCollateral, address liquidator, address borrower, uint repayAmount) external view returns (uint);
}

interface CErc20Storage {
    function underlying() external view returns (address);
}

interface Ireth{
    function liquidateBorrow(address reciever, address borrower, uint repayAmount) external;
    function borrowBalanceStored(address) external view returns (uint);
    function deposit() external payable;
    function withdraw(uint256) external;
    function balanceOf(address) external view returns(uint256);
}

interface Ievaluator{
    function getUsers() external view returns(address[] memory);
}


contract liquidateResolver is IUniswapV2Callee{
    address public RETH;
    Ievaluator eval;
    ComptrollerInterface CompTroller;

    address public owner;
    address public nominateOwner;

    using SafeERC20 for IERC20;

    address constant private CDAI = 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643;
    address constant private WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address constant private ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address constant private FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

   constructor(address _reth, address _evaluator, address _controller){
        RETH = _reth;
        CompTroller = ComptrollerInterface(_controller);
        eval = Ievaluator(_evaluator);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }
   
    receive() external payable {}
    fallback() external payable {}
    
    function checker() external view returns (bool canExec, bytes memory execPayload) {

        canExec = false;
        address borrowerToLiquidate;
        uint repayAmount;
        address liquidator = address(this);
        address[] memory borrower = eval.getUsers();

        for (uint i = 0; i < borrower.length; i++){         
            uint closeFactorMantissa = CompTroller.closeFactorMantissa();
            uint borrowBalance = Ireth(RETH).borrowBalanceStored(borrower[i]);
            repayAmount = ((closeFactorMantissa * borrowBalance) / 10**18);

            if (CompTroller.liquidateBorrowAllowed(RETH, RETH, liquidator, borrower[i], repayAmount) == 0) {
                borrowerToLiquidate = borrower[i];
                
                if(borrowerToLiquidate != address(0)) {
                    canExec = true ;
                    break;
                }
            }
        }

        execPayload = abi.encodeWithSelector(Ireth.liquidateBorrow.selector, address(this), address(borrowerToLiquidate), uint(repayAmount));

        return (canExec, execPayload);
    }

    function updateReth(address newAddress) public onlyOwner {
        require(newAddress != address(0), "Address Zero, Invalid");
        RETH = newAddress;
    }

    function nominate(address nominee) public onlyOwner {
        require(nominee != address(0), "Address Zero, Invalid");
        nominateOwner = nominee;
    }

    function acceptOwnerShip() public {
        require(msg.sender == nominateOwner, "Not Nominated");
        owner = nominateOwner;
        nominateOwner = address(0);
    }

    /**
     * Liquidate a Compound user with a flash swap
     *
     * @param _borrower (address): the Compound user to liquidate
     * @param _amount (uint): the amount (specified in units of _repayCToken.underlying) to flash loan and pay off
     */
    function liquidate(address _borrower, uint _amount) public {
        address pair;
        address r;

        r = CErc20Storage(CDAI).underlying();

        pair = IUniswapV2Factory(FACTORY).getPair(r, WETH);

        // Initiate flash swap
        bytes memory data = abi.encode(_borrower, CDAI, WETH);
        uint amount0 = IUniswapV2Pair(pair).token0() == r ? _amount : 0;
        uint amount1 = IUniswapV2Pair(pair).token1() == r ? _amount : 0;

        IUniswapV2Pair(pair).swap(amount0, amount1, address(this), data);
    }

    /**
     * The function that gets called in the middle of a flash swap
     *
     * @param sender (address): the caller of `swap()`
     * @param amount0 (uint): the amount of token0 being borrowed
     * @param amount1 (uint): the amount of token1 being borrowed
     * @param data (bytes): data passed through from the caller
     */
    function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) override external {
        // Unpack parameters sent from the `liquidate` function

        (address borrower, , ) = abi.decode(data, (address, address, address));

        address token0 = IUniswapV2Pair(msg.sender).token0();
        address token1 = IUniswapV2Pair(msg.sender).token1();
        require(msg.sender == IUniswapV2Factory(FACTORY).getPair(token0, token1));
        require(address(this) == sender, "!sender");

        uint amount;
        address source;
        address estuary;

        if (amount0 != 0) {
            amount = amount0;
            source = token0;
            estuary = token1;
        } else {
            amount = amount1;
            source = token1;
            estuary = token0;
        }

        // Perform the liquidation
        IERC20(source).approve(RETH, amount);
        Ireth(RETH).liquidateBorrow(address(this), borrower, amount);

        uint256 balance = Ireth(RETH).balanceOf(address(this));
        Ireth(RETH).withdraw(balance);

        (uint reserveOut, uint reserveIn) = UniswapV2Library.getReserves(FACTORY, source, estuary);
        uint debt = UniswapV2Library.getAmountIn(amount, reserveIn, reserveOut);

        Ireth(WETH).deposit{value: debt}();
        IERC20(WETH).transfer(msg.sender, debt);
    }

    function getBalance() public view returns(uint256 balance) {
        balance = address(this).balance;
    }

    function withdrawMaxEth(address payable _to) public onlyOwner {

        uint balance = address(this).balance;        
        (bool sent, ) = _to.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }
}
