// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface Ireth {
    function emergencyWithdraw() external;
}
interface IoracleCompound {
    function getUnderlyingPrice(address ctoken) external view returns (uint256);
}

interface Ichainlink {
    function latestAnswer() external view returns (uint256);
}


contract emergencyResolver {
    address public RETH;
    address DAI;
    uint public oracleTolerance;
    IoracleCompound constant oracleCompound =
        IoracleCompound(0x046728da7cb8272284238bD3e47909823d63A58D);
   Ichainlink constant oracleChainlinkEth =
        Ichainlink(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
    Ichainlink  oracleChainlinkDai =
        Ichainlink(0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9);
 
  constructor(address _reth) {
        RETH = _reth;
        DAI = address(0x6B175474E89094C44Da98b954EedeAC495271d0F);
        oracleTolerance = 10**16; //1%
    }
    
  function assignedNewValue(uint New_oracleTolerance) external {
        oracleTolerance = New_oracleTolerance;
    }


  function checker() external view returns (bool canExec, bytes memory execPayload)
    {
      //Eth check
        if (
            oracleCompound.getUnderlyingPrice(
                0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5
            ) <
            (oracleChainlinkEth.latestAnswer() * (10**18 - oracleTolerance)) /
                10**8 ||
            oracleCompound.getUnderlyingPrice(
                0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5
            ) >
            (oracleChainlinkEth.latestAnswer() * (10**18 + oracleTolerance)) /
                10**8
        ) {
            canExec = true;
        }
        //dai check
        if (
            oracleCompound.getUnderlyingPrice(
                0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643
            ) <
            (oracleChainlinkDai.latestAnswer() * (10**18 - oracleTolerance)) /
                10**8 ||
            oracleCompound.getUnderlyingPrice(
                0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643
            ) >
            (oracleChainlinkDai.latestAnswer() * (10**18 + oracleTolerance)) /
                10**8
        ) {
            canExec = true;
        }

        return (canExec, abi.encodeWithSelector(Ireth.emergencyWithdraw.selector));
    }
}
