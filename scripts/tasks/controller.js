exports.controller = async () => { 
    try { 
     const ControllerContract = await ethers.getContractFactory("contracts/controller.sol:Comptroller");
     const controller = await ControllerContract.deploy();
     await controller.attach(controller.address) // to make calls within hardhat
     console.log("ControllerContract deployed to:", controller.address);
     return controller
    } catch(error) { 
         throw error
    }
}