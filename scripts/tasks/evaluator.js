exports.evaluator = async (rethAddress, controllerAddress, rswapAddress, rsethAddress) => { 
    try { 
     const EvaluatorContract = await ethers.getContractFactory("evaluator");
     const evaluator = await EvaluatorContract.deploy(rethAddress, controllerAddress, rswapAddress, rsethAddress);
     await evaluator.attach(evaluator.address) // to make calls within hardhat
     console.log("EvaluatorContract deployed to:", evaluator.address);
     return evaluator
    } catch(error) { 
         throw error
    }
}