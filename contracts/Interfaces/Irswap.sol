//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

interface Irswap{
    function checkPrice(address token0,address token1) external view returns (uint24);
    function swap(address token0,address token1,uint amountIn) external returns (uint);
    function swapDaiforEth(uint amount) external returns (uint);
    function oracleMismatch() external view;
    function minOut(uint256 a,address t0,address t1) external view returns(uint);
}
