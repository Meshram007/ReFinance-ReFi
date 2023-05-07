require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
  //  hardhat: {
  //     gas: "auto",
  //     gasPrice: "auto",
  //     chainId: 31337,
  //     live: false,
  //     loggingEnabled: false,
  //     timeout: 200000,
  //     mining: {
  //       mempool: {
  //         order: "fifo"
  //       }
  //     },
  //     forking: {
  //       url: "https://eth-mainnet.alchemyapi.io/v2/7R18Ic1nTlgkd1-OJ2d5RCZdNxVli_nh",
  //       blockNumber: 13862876,
  //       enabled: true
  //     }
  //   },
    localhost: {
      chainId: 31337,
      //url: 'http://localhost:8545',
      live: false,
      saveDeployments: true, // Issue is here
      forking: {
        url: process.env.FORKING_URL,
        blockNumber: 13862876
      },
      timeout: 200000,
      mining: {
        mempool: {
          order: "fifo"
        }
      }
    },
    // ropsten: {
    //   url: process.env.ROPSTEN_URL,
    //   accounts: [process.env.PVT_KEY],
    //   gasLimit: 210000000,
    //   gasPrice: 100e9
    // },
    // rinkeby: {
    //   url: process.env.RINKEBY_URL,
    //   accounts: [process.env.RINKEBY_KEY],
    //   gasLimit: 21000000,
    //   gasPrice: 100e9,
    // },
    // mainnet: {
    //   url: process.env.MAINNET_URL,
    //   accounts: [process.env.MAINNET_KEY],
    //   gasLimit: 21000000,
    //   gasPrice: 100e9,
    // },
    // forking: {
    //   url: "http://34.245.216.66:7545/",
    //   accounts: [process.env.FORKING_KEY],
    // }, 

  },
  
  etherscan :{
    apiKey: process.env.API_KEY
  },
  //compilers:
  gasReporter: {
    currency: 'USD',
    // gasPriceApi: process.env.COINMARKETCAP_KEY
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  
};
