// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import 'contracts/utils/openzeppelin/Ownable.sol';

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}


interface IOracle{
    function getUnderlyingPrice(address cToken) external view returns (uint);
}

interface Ireth {
    function harvest() external;
    function lastHarvest() external view returns(uint);
}
interface Ieval{
    function harvestTriggers() external view returns (uint,uint,uint);
}
contract harvestResolver is Ownable {
    address public reth;
    address immutable comp = 0xc00e94Cb662C3520282E6f5717214004A7f26888;
    IERC20 immutable farm = IERC20(0xa0246c9032bC3A600820415aE600c6388619A14D);
    Ieval public eval;
   constructor(address _reth,address _eval) {
        reth = _reth;
        eval = Ieval(_eval);
    }

    

    function checker() external view returns (bool canExec, bytes memory execPayload)
    {
        uint farmRewards = farm.balanceOf(reth);
        uint compRewards = IERC20(comp).balanceOf(reth);
        uint lastHarvest = Ireth(reth).lastHarvest();
        (uint minTime,uint compRewardsLimit,uint farmRewardsLimit) = eval.harvestTriggers();

        if(block.timestamp > lastHarvest+minTime||(farmRewards > farmRewardsLimit) || (compRewards> compRewardsLimit)) {
            canExec = true ;
        }
        
        return (canExec, abi.encodeWithSelector(Ireth.harvest.selector));
    }
}
