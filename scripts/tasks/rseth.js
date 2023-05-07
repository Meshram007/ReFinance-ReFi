exports.rseth = async (rethAddress) => { 
    try { 
     const RsethContract = await ethers.getContractFactory("contracts/rseth.sol:rseth");
     const rseth = await RsethContract.deploy(rethAddress);
     await rseth.attach(rseth.address) // to make calls within hardhat
     console.log("RsethContract deployed to:", rseth.address);
     return rseth
    } catch(error) { 
         throw error
    }
}