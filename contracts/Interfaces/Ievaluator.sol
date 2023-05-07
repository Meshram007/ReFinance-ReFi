//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

interface Ieval{

    enum MathError {
        NO_ERROR,
        DIVISION_BY_ZERO,
        INTEGER_OVERFLOW,
        INTEGER_UNDERFLOW
    }

    function borrowCheck(address user,uint amount) external view returns (uint,uint);

    function vaultLTV() external returns(uint);

    function withdrawCheck(address account,uint cAmount) external returns (uint);

    function evalCommit(address user,uint initialH, uint finalH) external view returns (uint rewards,uint lastRewards);

    function borrowBalanceStoredInternal(address user) external view returns (MathError, uint);

    function accrueInterest() external returns(uint result, uint borrowIndex);

    function harvestCheck() external view;

    function depositCheck(address user,uint amount) external;

    function store() external view returns (uint,uint,uint,uint,uint);

    function whitelisted(address) external returns (bool);

    function repayEmergency() external returns (uint);
}