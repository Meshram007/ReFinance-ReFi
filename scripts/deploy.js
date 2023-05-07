const { run } = require("hardhat");
const { reth } = require("./tasks/reth");
const { rseth } = require("./tasks/rseth");
const { rSwap } = require("./tasks/rswap");
const { evaluator } = require("./tasks/evaluator");
const { controller } = require("./tasks/controller");

const info = async () => {
  const [deploySigner] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deploySigner.address);
  console.log("Account balance:", (await deploySigner.getBalance()).toString());
}

async function main() {

  const oracleAddress = "0x046728da7cb8272284238bd3e47909823d63a58d";
  const addresses = []

  // 0x3cC47874dC50D98425ec79e647d83495637C55e3 => rethContract
  
  await info();

  const [deploySigner] = await ethers.getSigners();

  const controllerContract = await controller();
  await controllerContract.deployTransaction.wait()

  const rSwapContract = await rSwap();
  await rSwapContract.deployTransaction.wait()

  const rethContract = await reth(rSwapContract.address, controllerContract.address)
  await rethContract.deployTransaction.wait()

  const rsethContract = await rseth(rethContract.address);
  await rsethContract.deployTransaction.wait()

  const evaluatorContract = await evaluator(rethContract.address, controllerContract.address, rSwapContract.address, rsethContract.address);
  await evaluatorContract.deployTransaction.wait()

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const setOracle = await controllerContract.connect(deploySigner)._setPriceOracle(oracleAddress)
  await setOracle.wait();
  console.log("SetOracle");

  const changeAddresses = await controllerContract.connect(deploySigner).changeAddresses(rethContract.address, evaluatorContract.address)
  await changeAddresses.wait();
  console.log("changeAddresses");

  const rethAddresses = await rethContract.connect(deploySigner).changeAddresses(controllerContract.address, rsethContract.address, evaluatorContract.address, oracleAddress, rSwapContract.address)
  await rethAddresses.wait();
  console.log("rethAddresses");

  const setEvaluator = await rsethContract.connect(deploySigner).setAddress(evaluatorContract.address)
  await setEvaluator.wait();
  console.log("setEvaluator");

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // await verifyContracts(rSwapContract.address, controllerContract.address, rethContract.address, rsethContract.address, evaluatorContract.address) 

  await whiteListAdd(addresses);
}

async function whiteListAdd(addresses) {

  for(let address in addresses) {
    let whitelisted = await evaluator.connect(deploySigner).doWhitelist(address);
    await whitelisted.wait();
    console.log(`${address} is whitelisted.`);
  }

}

async function verifyContracts( rswapContract,
                                controllerContract,
                                rethContract,
                                rsethContract,
                                evaluatorContract) {

  await verify(rswapContract)
  await verify(controllerContract)
  await verify(rethContract,[controllerContract, rswapContract]);
  await verify(rsethContract,[rethContract])
  await verify(evaluatorContract,[rethContract, controllerContract, rswapContract, rsethContract])
}

async function verify(contractAddress, arguments){

  try{
        await run("verify:verify", {
          address: contractAddress,
          constructorArguments: arguments
        })
     }
     catch(error) {
        console.error(error);
      };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
