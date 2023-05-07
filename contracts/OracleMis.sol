// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
contract retrieve {
    uint256 private answer;
    function latestAnswer() external view returns(uint256) {
        return answer;
    }
    function setAnswer(uint256 value) external {
        answer = value;
    }
}