//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "contracts/utils/openzeppelin/Ownable.sol";

interface Ireth {
    function commitUsers(address[] memory users, uint256 tillHarvest) external;

    function userData(address user1)
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        );

    function harvestIndex() external view returns (uint256);
}

interface Ievaluator {
    function users(uint256 index) external view returns (address);

    function usersLength() external view returns (uint256);
}

contract CommitUserResolver is Ownable {
    address public RETH;
    address public eval;
    uint256 public limit = 20;

    constructor(address _reth, address _eval) {
        RETH = _reth;
        eval = _eval;
    }

    function changeLimit(uint256 newLimit) external onlyOwner {
        limit = newLimit;
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        uint256 numberOfUsers;
        uint256 harvestIndex = Ireth(RETH).harvestIndex();
        uint256 length = Ievaluator(eval).usersLength();
        for (uint256 i = 0; i < length; i++) {
            address user = Ievaluator(eval).users(i);
            (uint256 uptillHarvest, , , ) = Ireth(RETH).userData(user);
            if (harvestIndex - uptillHarvest > 1) {
                numberOfUsers++;
            }
        }
        if (numberOfUsers != 0) {
            if (numberOfUsers > limit) {
                numberOfUsers = limit;
            }
            address[] memory usersToCommit = new address[](numberOfUsers);
            uint256 curr;
            for (uint256 i = 0; i < length; i++) {
                address user = Ievaluator(eval).users(i);
                (uint256 uptillHarvest, , , ) = Ireth(RETH).userData(user);

                if ( harvestIndex - uptillHarvest > 1 ) {
                    if (curr == limit - 1) {
                        break;
                    }
                    usersToCommit[curr] = (user);
                    curr++;
                }
            }
            canExec = true;
            execPayload = abi.encodeWithSelector(
            Ireth.commitUsers.selector,
            [usersToCommit],
            harvestIndex
        );
        }
        return (canExec, execPayload);
    }
}
