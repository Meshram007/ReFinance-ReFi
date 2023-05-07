// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import 'contracts/utils/openzeppelin/Ownable.sol';


interface ICEth {
    function balanceOf(address owner) external view returns (uint256);
}

interface InterfaceYieldPool {
    function earned(address account) external view returns (uint256);
}

interface ICErc20 {
    function borrowBalanceStored(address account) external view returns (uint);
}

interface IComMarketState {
    struct CompMarketState {
        // @notice The market's last updated compBorrowIndex or compSupplyIndex
        uint224 index;
        // @notice The block number the index was last updated at
        uint32 block;
    }
}


interface IComptrollerStorage is IComMarketState {
   function compSupplyState(address) external view returns(CompMarketState memory);
   function compBorrowState(address) external view returns(CompMarketState memory);
   function compSupplierIndex(address, address) external view returns(uint);
   function compAccrued(address) external view returns(uint);
}

interface ComptrollerInterface is IComptrollerStorage {
    function compInitialIndex() external view returns (uint224);
}

interface Ireth {
   function claimRewards() external;
 }

contract claimTokensResolver is IComMarketState , Ownable {
    address public RETH;
    ICEth  Exceth;
    ICErc20  Excdai;
    ComptrollerInterface ExCompTroller;
    InterfaceYieldPool Expool;
    uint public farmRewardLimits;
    uint public compRewardsLimits;
    uint224 public constant compInitialIndex = 1e36;

   constructor(address _reth) {
        Exceth = ICEth(0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5);
        RETH = _reth;
        Excdai = ICErc20(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643);
        Expool = InterfaceYieldPool(0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A);
        ExCompTroller = ComptrollerInterface(0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B);
    }


  function assignedNewValue(uint new_farmRewardLimits, uint new_compRewardsLimits) external onlyOwner {
        farmRewardLimits = new_farmRewardLimits;
        compRewardsLimits = new_compRewardsLimits;
    }


  function distributeSupplierComp() public view returns(uint) {
        CompMarketState memory supplyState = ExCompTroller.compSupplyState(address(Exceth));
        uint compSupplierIndex = ExCompTroller.compSupplierIndex(address(Exceth), RETH);
        uint compAccrued = ExCompTroller.compAccrued(RETH);

        if (compSupplierIndex == 0 && supplyState.index > 0) {
            compSupplierIndex = ExCompTroller.compInitialIndex();
        }

        uint deltaIndex = (supplyState.index - compSupplierIndex);
        uint supplierTokens = Exceth.balanceOf(RETH);
        uint supplierDelta = (supplierTokens * deltaIndex);
        uint supplierAccrued = (compAccrued + supplierDelta);
        return supplierAccrued;
    }
    

    function distributeBorrowerComp() public view returns(uint) {
        CompMarketState memory borrowState = ExCompTroller.compBorrowState(address(Excdai));
        uint compBorrowerIndex = ExCompTroller.compSupplierIndex(address(Excdai), RETH);
        uint compAccrued = ExCompTroller.compAccrued(RETH);
        
        if (compBorrowerIndex > 0) {
            uint deltaIndex = (borrowState.index - compBorrowerIndex);
            uint borrowerAmount = Excdai.borrowBalanceStored(RETH);
            uint borrowerDelta = (borrowerAmount * deltaIndex);
            uint borrowerAccrued = (compAccrued + borrowerDelta);
        return borrowerAccrued;    
        }
        return 0;
    }
   

    function checker() external view returns (bool canExec, bytes memory execPayload)
    {
        canExec = false;
        uint farmRewards = Expool.earned(RETH); 
    
        if((farmRewards > farmRewardLimits) ||
        ((distributeBorrowerComp() + distributeSupplierComp()) > compRewardsLimits))  {
            canExec = true ;
        }
        
        execPayload = abi.encodeWithSelector(Ireth.claimRewards.selector);
        return (canExec, execPayload);
    }
}
