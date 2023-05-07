exports.rSwap = async () => { 
    try { 
     const RSwapContract = await ethers.getContractFactory("rSwap");
     const rSwap = await RSwapContract.deploy();
     await rSwap.attach(rSwap.address) // to make calls within hardhat
     console.log("RSwapContract deployed to:", rSwap.address);
     return rSwap
    } catch(error) { 
         throw error
    }
}