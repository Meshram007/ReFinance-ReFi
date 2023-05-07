exports.reth = async (swapAddress, controllerAddress) => { 
    try { 
     const RethContract = await ethers.getContractFactory("rETH");
     const reth = await RethContract.deploy(controllerAddress, swapAddress)
     console.log("RethContract deployed to:", reth.address);
     return reth
    } catch(error) { 
         throw error
    }
}