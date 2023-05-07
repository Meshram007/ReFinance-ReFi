// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  //const Greeter = await hre.ethers.getContractFactory("poc");
  //const greeter = await Greeter.deploy("0xd6801a1dffcd0a410336ef88def4320d6df1883e","0x5722a3f60fa4f0ec5120dcd6c386289a4758d1b2","0x2EAa9D77AE4D8f9cdD9FAAcd44016E746485bddb");
  const Controller = await hre.ethers.getContractFactory("contracts/controller.sol:Comptroller");
  const controller = await Controller.deploy();

  const Pocm = await hre.ethers.getContractFactory("pocm");
  const pocm = await Pocm.deploy();
    console.log(pocm);
  //await pocm.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
