// //testing mainnet
// const { expect, assert } = require("chai");
// const { ethers } = require("hardhat");
// const Web3 = require("web3");
// const hre = require("hardhat");
// const BigNumber = ethers.BigNumber

// const contAbi = [{ "inputs": [{ "internalType": "address", "name": "_storage", "type": "address" }, { "internalType": "address", "name": "_feeRewardForwarder", "type": "address" }, { "internalType": "address[]", "name": "_whitelist", "type": "address[]" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "vault", "type": "address" }, { "indexed": true, "internalType": "address", "name": "strategy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "oldSharePrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newSharePrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "SharePriceChangeLog", "type": "event" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "addCodeToWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_worker", "type": "address" }], "name": "addHardWorker", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "_targets", "type": "address[]" }], "name": "addMultipleToWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "addToWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_vault", "type": "address" }, { "internalType": "address", "name": "_strategy", "type": "address" }], "name": "addVaultAndStrategy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "codeWhitelist", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_vault", "type": "address" }], "name": "doHardWork", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeRewardForwarder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "a", "type": "address" }], "name": "getContractHash", "outputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "governance", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "greyList", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "hardRewards", "outputs": [{ "internalType": "contract IHardRewards", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "hardWorkers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "multiSig", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "notifyFee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingDenominator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingNumerator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "removeCodeFromWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "removeFromWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_worker", "type": "address" }], "name": "removeHardWorker", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "_targets", "type": "address[]" }], "name": "removeMultipleFromWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "salvage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_strategy", "type": "address" }, { "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "salvageStrategy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeRewardForwarder", "type": "address" }], "name": "setFeeRewardForwarder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_hardRewards", "type": "address" }], "name": "setHardRewards", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_store", "type": "address" }], "name": "setStorage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "store", "outputs": [{ "internalType": "contract Storage", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "whitelist", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }]
// const contaddress = "0x3cC47874dC50D98425ec79e647d83495637C55e3";

// const daiAbi = [{ "inputs": [{ "internalType": "uint256", "name": "chainId_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "guy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": true, "inputs": [{ "indexed": true, "internalType": "bytes4", "name": "sig", "type": "bytes4" }, { "indexed": true, "internalType": "address", "name": "usr", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "arg1", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "arg2", "type": "bytes32" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "deny", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "mint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "move", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "allowed", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "pull", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "push", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "rely", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "wards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]
// const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

// const oracleAbi = [{ "inputs": [{ "internalType": "uint256", "name": "anchorToleranceMantissa_", "type": "uint256" }, { "internalType": "uint256", "name": "anchorPeriod_", "type": "uint256" }, { "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig[]", "name": "configs", "type": "tuple[]" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "anchorPrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "oldTimestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTimestamp", "type": "uint256" }], "name": "AnchorPriceUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "FailoverActivated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "FailoverDeactivated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "reporter", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "anchor", "type": "uint256" }], "name": "PriceGuarded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "PriceUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "oldTimestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTimestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "oldPrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newPrice", "type": "uint256" }], "name": "UniswapWindowUpdated", "type": "event" }, { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "activateFailover", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "anchorPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "deactivateFailover", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ethBaseUnit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "expScale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "i", "type": "uint256" }], "name": "getTokenConfig", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }], "name": "getTokenConfigByCToken", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "reporter", "type": "address" }], "name": "getTokenConfigByReporter", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "symbol", "type": "string" }], "name": "getTokenConfigBySymbol", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "getTokenConfigBySymbolHash", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "underlying", "type": "address" }], "name": "getTokenConfigByUnderlying", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }], "name": "getUnderlyingPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lowerBoundAnchorRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "newObservations", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "acc", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "oldObservations", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "acc", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "pokeFailedOverPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "symbol", "type": "string" }], "name": "price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "prices", "outputs": [{ "internalType": "uint248", "name": "price", "type": "uint248" }, { "internalType": "bool", "name": "failoverActive", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "upperBoundAnchorRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "int256", "name": "currentAnswer", "type": "int256" }], "name": "validate", "outputs": [{ "internalType": "bool", "name": "valid", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]
// const oracleAddress = "0x046728da7cb8272284238bD3e47909823d63A58D";
// let oracle;

// const cethAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "mint", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "repayBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "initialExchangeRateMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }, { "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "liquidator", "type": "address" }, { "name": "borrower", "type": "address" }, { "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }], "name": "repayBorrowBehalf", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "comptroller_", "type": "address" }, { "name": "interestRateModel_", "type": "address" }, { "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "name": "name_", "type": "string" }, { "name": "symbol_", "type": "string" }, { "name": "decimals_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "minter", "type": "address" }, { "indexed": false, "name": "mintAmount", "type": "uint256" }, { "indexed": false, "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "redeemer", "type": "address" }, { "indexed": false, "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "payer", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "liquidator", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldComptroller", "type": "address" }, { "indexed": false, "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "error", "type": "uint256" }, { "indexed": false, "name": "info", "type": "uint256" }, { "indexed": false, "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event" }]
// const cethaddress = "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5"
// let ceth;

// const cdaiAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "mint", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "repayBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "initialExchangeRateMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }, { "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "liquidator", "type": "address" }, { "name": "borrower", "type": "address" }, { "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }], "name": "repayBorrowBehalf", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "comptroller_", "type": "address" }, { "name": "interestRateModel_", "type": "address" }, { "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "name": "name_", "type": "string" }, { "name": "symbol_", "type": "string" }, { "name": "decimals_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "minter", "type": "address" }, { "indexed": false, "name": "mintAmount", "type": "uint256" }, { "indexed": false, "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "redeemer", "type": "address" }, { "indexed": false, "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "payer", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "liquidator", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldComptroller", "type": "address" }, { "indexed": false, "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "error", "type": "uint256" }, { "indexed": false, "name": "info", "type": "uint256" }, { "indexed": false, "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event" }]
// const cdaiaddress = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
// let cdai;

// let controller, rswap, reth, rseth, evaluator;

// var web3 = new Web3(hre.network.provider);
// web3.eth.getChainId().then(res => console.log("Chain ID:", res));




// async function getAddresses() {
//   [deploySigner, user2, user3, user4, user5, user6, user7] = await ethers.getSigners();
//   //deploySigner = owner;
//   deploySigner.getAddress().then(res => console.log("Deployer : ", res))
//   user2.getAddress().then(res => console.log("User 2 : ", res))
//   user3.getAddress().then(res => console.log("User 3 : ", res))
//   user4.getAddress().then(res => console.log("User 4 : ", res))
//   user5.getAddress().then(res => console.log("User 5 : ", res))
//   user6.getAddress().then(res => console.log("User 6 : ", res))
//   user7.getAddress().then(res => console.log("User 7 : ", res))
// }
// async function deploy() {
//   oracle = new ethers.Contract(oracleAddress, oracleAbi, deploySigner)
//   ceth = new ethers.Contract(cethaddress, cethAbi, deploySigner)
//   cdai = new ethers.Contract(cdaiaddress, cdaiAbi, deploySigner)
//   const Controller = await ethers.getContractFactory("contracts/controller.sol:Comptroller");
//   controller = await Controller.deploy();
//   console.log("Controller deployed to:", controller.address);

//   const Rswap = await ethers.getContractFactory("rSwap");
//   rswap = await Rswap.deploy();
//   console.log("rswap deployed to:", rswap.address);

//   const Reth = await ethers.getContractFactory("rETH");
//   reth = await Reth.deploy(controller.address, rswap.address);
//   console.log("reth deployed to:", reth.address);

//   const Rseth = await ethers.getContractFactory("contracts/rseth.sol:rseth");
//   rseth = await Rseth.deploy(reth.address);
//   console.log("rseth deployed to:", rseth.address);

//   const Evaluator = await ethers.getContractFactory("evaluator");
//   evaluator = await Evaluator.deploy(reth.address, controller.address, rswap.address, rseth.address);

//   console.log("evaluator deployed to:", evaluator.address);

//   describe("Contracts Config", async function () {

//     it("should set the Price Oracle", async function () {
//       await controller.connect(deploySigner)._setPriceOracle("0x046728da7cb8272284238bD3e47909823d63A58D")
//       expect(await controller.oracle()).to.equal("0x046728da7cb8272284238bD3e47909823d63A58D");
//     })

//     it("should change to new reth & evaluator ", async function () {
//       await controller.connect(deploySigner).changeAddresses(reth.address, evaluator.address)
//       expect(await controller.rEth()).to.equal(reth.address);
//       expect(await controller.eval()).to.equal(evaluator.address);
//     })
//     // it("Should change R2C", async function () {
//     //   await controller.connect(deploySigner).setR2C(reth.address, "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5", "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643");
//     //   const res = await controller.R2C(reth.address)
//     //   expect(res.ceth).to.equal("0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5");
//     //   expect(res.cdai).to.equal("0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643");
//     // })

//     it("should update Addresses", async function () {
//       await reth.connect(deploySigner).changeAddresses(controller.address, rseth.address, evaluator.address)
//       expect(await reth.stabilityUserContract()).to.equal(rseth.address);
//       expect(await reth.RefiTroller()).to.equal(controller.address);
//       expect(await reth.eval()).to.equal(evaluator.address);
//     })

//     describe("whitelist reth", async function () {
//       it("WhiteList Reth", async function () {
//         await whiteListAdd();
//       })
//     })
//     describe("Fund Dai", async function () {
//       it("Fund dai by impersonating", async function () {
//         const accountToInpersonate = "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503"

//         await hre.network.provider.request({
//           method: "hardhat_impersonateAccount",
//           params: [accountToInpersonate],
//         });
//         const daiContract = await new web3.eth.Contract(daiAbi, daiAddress);
//         await daiContract.methods.transfer(await deploySigner.getAddress(), ethers.utils.parseEther("10")).send({ from: accountToInpersonate })
//         await daiContract.methods.transfer(reth.address, ethers.utils.parseEther("1")).send({ from: accountToInpersonate })
//         //console.log("Adding Success");
//         await hre.network.provider.request({
//           method: "hardhat_stopImpersonatingAccount",
//           params: [accountToInpersonate],
//         });
//       })
//     })

//   })
// }
// async function resetFork() {
//   const Controller = await ethers.getContractFactory("contracts/controller.sol:Comptroller");
//   controller = await Controller.deploy();
//   console.log("Controller deployed to:", controller.address);

//   const Rswap = await ethers.getContractFactory("rSwap");
//   rswap = await Rswap.deploy();
//   console.log("rswap deployed to:", rswap.address);

//   const Reth = await ethers.getContractFactory("rETH");
//   reth = await Reth.deploy(controller.address, rswap.address);
//   console.log("reth deployed to:", reth.address);

//   const Rseth = await ethers.getContractFactory("contracts/rseth.sol:rseth");
//   rseth = await Rseth.deploy(reth.address);
//   console.log("rseth deployed to:", rseth.address);

//   const Evaluator = await ethers.getContractFactory("evaluator");
//   evaluator = await Evaluator.deploy(reth.address, controller.address, rswap.address, rseth.address);

//   console.log("evaluator deployed to:", evaluator.address);

//   await controller.connect(deploySigner)._setPriceOracle("0x046728da7cb8272284238bD3e47909823d63A58D")

//   await controller.connect(deploySigner).changeAddresses(reth.address, evaluator.address)

//   await reth.connect(deploySigner).changeAddresses(controller.address, rseth.address, evaluator.address)

//   await whiteListAdd();
// }

// async function whiteListAdd() {

//   const accountToInpersonate = "0xf00dD244228F51547f0563e60bCa65a30FBF5f7f"

//   await hre.network.provider.request({
//     method: "hardhat_impersonateAccount",
//     params: [accountToInpersonate],
//   });
//   harvestGov = await ethers.getSigner(accountToInpersonate)
//   const ContContract = await new web3.eth.Contract(contAbi, contaddress);
//   await ContContract.methods.addToWhitelist(reth.address).send({ from: accountToInpersonate })
//   // //console.log("Adding Success");
//   // await hre.network.provider.request({
//   //   method: "hardhat_stopImpersonatingAccount",
//   //   params: [accountToInpersonate],
//   // });
//   describe("Reth Should be Whitelisted", async function () {
//     expect(await ContContract.methods.whitelist(reth.address).call()).to.equal(true);
//   })

// }
// async function checkReth() {
//   describe("Functions Check", async function () {
//     async function basicCheck() {
//       describe("Basic Check", async function () {
//         it("Deposit 0.1 Ether", async function () {
//           let overrides = {
//             value: ethers.utils.parseEther("0.1")

//           };
//           await reth.connect(deploySigner).deposit(overrides);
//           expect(parseInt(await reth.balanceOf(deploySigner.getAddress()))).to.be.greaterThan(0);
//         })
//         it("borrow 100 Dai", async function () {
//           await reth.connect(deploySigner).borrow(ethers.utils.parseEther("100"));
//           const res = await reth.accountBorrows(deploySigner.getAddress())
//           expect(parseInt(ethers.utils.formatEther(res.principal))).to.be.equal(100);
//         })

//         it("repay all Dai", async function () {
//           const daiContract = await new web3.eth.Contract(daiAbi, daiAddress);
//           const res = await reth.borrowBalanceStored(await deploySigner.getAddress())
//           //console.log(ethers.BigNumber.from(res._hex).mul(101).div(100));

//           await daiContract.methods.approve(reth.address, res.mul(101).div(100)).send({ from: await deploySigner.getAddress() });

//           await reth.connect(deploySigner).repayAll(await deploySigner.getAddress());
//           const res2 = await reth.accountBorrows(deploySigner.getAddress())
//           expect(res2.principal).to.be.equal(0);
//         })

//         it("TakeLoan - 1 Ether Deposit + 10 Dai borrow - Account 2", async function () {
//           let overrides = {
//             value: ethers.utils.parseEther("1")

//           };
//           const res0 = await reth.accountBorrows(user2.getAddress())
//           await reth.connect(user2).takeLoan(ethers.utils.parseEther("10"), overrides)
//           const res = await reth.accountBorrows(user2.getAddress())
//           expect(parseInt(ethers.utils.formatEther(res.principal)) - parseInt(ethers.utils.formatEther(res0.principal))).to.be.equal(10);
//           //console.log(parseInt(await reth.accountBorrows(deploySigner.getAddress())));
//         })

//         it("Withdraw all Eth ", async function () {
//           await new Promise(resolve => setTimeout(resolve, 5000));
//           const tx = await reth.connect(deploySigner).withdraw((await reth.balanceOf(deploySigner.getAddress())));
//           let amount;
//           const res = await tx.wait()
//           amount = (res.events.find(x => x.event == 'withdrawn').args.amount)
//           //console.log(amount.toString());
//           expect(amount.toString()).to.be.within(BigNumber.from(ethers.utils.parseEther("0.1")), BigNumber.from(ethers.utils.parseEther("0.101")));
//         })
//       })
//     }
//     await basicCheck();
//     //await basicCheck();
//     await extendedCheck();
//     async function extendedCheck() {
//       describe("extended check", async function () {
//         it("Deposit 1 Ether - Account 3", async function () {
//           let overrides = {
//             value: ethers.utils.parseEther("1")

//           };
//           await reth.connect(user3).deposit(overrides);
//           expect(parseInt(await reth.balanceOf(user3.getAddress()))).to.be.greaterThan(0);
//         })

//         it("Should rebalance Condition #1 - LTV < minLTV", async function () {
//           //If LTV < min LTV
//           await evaluator.connect(deploySigner).vaultLTV()
//           const res = await evaluator.vaultLTVStored();
//           const store = await evaluator.store();
//           expect(BigNumber.from(res)).to.be.within(BigNumber.from(0), BigNumber.from(store.minLTV)) //condition statisfied
//           await reth.connect(deploySigner).rebalance()
//           await evaluator.connect(deploySigner).vaultLTV()
//           const res2 = await evaluator.vaultLTVStored();
//           expect(BigNumber.from(res2)).to.be.within(BigNumber.from(store.tLTV), BigNumber.from(store.tLTV).mul(101).div(100))
//         })
//         it("Withdraw all Eth - Account 3", async function () {
//           await new Promise(resolve => setTimeout(resolve, 5000));
//           const tx = await reth.connect(user3).withdraw((await reth.balanceOf(user3.getAddress())));
//           let amount;
//           const res = await tx.wait()
//           amount = (res.events.find(x => x.event == 'withdrawn').args.amount)
//           //console.log(amount.toString());
//           expect(amount.toString()).to.be.within(BigNumber.from(ethers.utils.parseEther("1")), BigNumber.from(ethers.utils.parseEther("1.01")));

//         })
//         it("Should rebalance Condition #2 - LTV > maxLTV ", async function () {
//           //If LTV < min LTV
//           await evaluator.connect(deploySigner).vaultLTV()
//           const res = await evaluator.vaultLTVStored();
//           //console.log(res.toString());
//           const store = await evaluator.store();
//           if (BigNumber.from(res).gt(BigNumber.from(store.maxLTV))) {
//             expect(BigNumber.from(res)).to.be.within(BigNumber.from(store.maxLTV), BigNumber.from(ethers.utils.parseEther("1")))
//             await reth.connect(deploySigner).rebalance()
//             await evaluator.connect(deploySigner).vaultLTV()
//             const res2 = await evaluator.vaultLTVStored();
//             expect(BigNumber.from(res2.toString())).to.be.within(BigNumber.from(store.tLTV).mul(99).div(100), BigNumber.from(store.tLTV).mul(101).div(100))
//           }
//         })
//         it("Harvest without rewards ", async function () {
//           await new Promise(resolve => setTimeout(resolve, 10000));
//           const res0 = await reth.index();
//           await reth.connect(deploySigner).harvest();
//           const res = await reth.index();
//           expect(BigNumber.from(res)).to.be.equal(BigNumber.from(res0).add(BigNumber.from("1")))
//         }).timeout(50000)
//       })
//       //await basicCheck();
//     }
//     //await extendedCheck();
//   })
// }
// async function testScenarios() {
//   async function testCasesreth() {
//     describe("Test cases", async function () {
//       it("#10 An user should be rewarded in the harvest", async () => {
//         deposit = '100'
//         blocksToMine = (365 * 24 * 60 * 60) / (13.15)
//         ethInDai = await ethToDai(deposit);
//         console.log(ethInDai);
//         borrowed = ((40 / 100) * ethInDai).toPrecision(24)
//         previousEthBalance = await web3.eth.getBalance(user2);
//         previousDaiBalance = await dai.methods.balanceOf(user2).call();
//         await reth.connect(user2).takeLoan(borrowed, { value: ethers.utils.parseEther(deposit) })
//         block1 = await web3.eth.getBlock("latest")
//         await reth.connect(user3).rebalance()
//         await mineBlocks(blocksToMine)
//         await reth.connect(user3).harvest();
//         await mineBlocks(1)
//         await reth.connect(user3).harvest();
//         block2 = await web3.eth.getBlock("latest")
//         blocksMined = block2.number - block1.number

//         _supplyRatePerBlock = await reth.supplyRatePerBlock();
//         _borrowRatePerBlock = await reth.borrowRatePerBlock();
//         ethMantissa = 1e18
//         rewardByBlock = ((_supplyRatePerBlock * (deposit * 1e18)) / ethMantissa) * (blocksMined + 2)

//         interestByBlock = ((_borrowRatePerBlock * (40 * 1e18)) / ethMantissa) * (blocksMined + 2)

//         console.log({
//           blocksMined, supplyRatePerBlock: _supplyRatePerBlock.toString(),
//           borrowRatePerBlock: _borrowRatePerBlock.toString(), deposit: ethInDai, borrowed, rewardByBlock,
//           interestByBlock
//         });
//         ethInDai = await ethToDai(interestByBlock);
//         interest = (ethInDai).toPrecision(24)
//         amountToRepay = (borrowed + interest).toPrecision(23)
//         amountToWithdraw = (deposit * ethMantissa + rewardByBlock)

//         await dai.methods.approve(rethAddress, amountToRepay).send({ from: user2.address })
//         await reth.connect(user2).repaywithdraw(user2, amountToRepay, amountToWithdraw);

//         userBalance = await web3.eth.getBalance(user2.address);
//         expect(previousEthBalance + rewardByBlock).to.equal(userBalance);
//         userDaiBalance = await dai.methods.balanceOf(user2.address).call();
//         daiAmount = '40'
//         APY = await axios.get(`https://wissg5tmbg.eu-west-1.awsapprunner.com/api/info/getYeildApy`);
//         equivalentDai = await ethToDai(daiAmount);
//         store = await reth.store();
//         calDai = (-(interestByBlock)) + ((await ethToDai(deposit)) * store.tLTV / 1e18 - (await ethToDai(daiAmount))) * APY.data.yieldApy * (1 - store.reserveFactor / 1e18)

//         expect(userDaiBalance).to.equal(previousDaiBalance - calDai);
//         // refi balances
//         refiDAI = await fdai.methods.balanceOf(rethAddress).call();
//         refiBalances = ((await ethToDai(deposit)) * store.tLTV - (await ethToDai(daiAmount))) * APY.data.yieldApy * (1 - store.reserveFactor / 1e18)
//         console.log(refiBalances);
//       }).timeout('40s')
//     })
//   }
//   await testCasesreth();
// }
// async function stabilityUserCheck() {
//   async function stabilityTestCases() {
//     describe("Stability Test cases", async function () {
//       it("#19 A stability user should receive interest on their collateral", async () => {

//         deposit = "100"
//         await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })



//         // Withdraw
//         blocksToMine = (400) / (13.15)
//         let block = await web3.eth.getBlock('latest')
//         let time = block.timestamp
//         const amount = rseth.balanceOf(user4.address);
//         await rseth.connect(user4).requestRelease(amount)
//         await mineBlocks(blocksToMine);
//         _supplyRatePerBlock = await ceth.supplyRatePerBlock();
//         block = await web3.eth.getBlock('latest')
//         time = block.timestamp - time;
//         expect(time).to.greaterThan(180)
//         expect(time).to.lessThan(500)
//         try {
//           const tx = await rseth.connect(user4).withdraw(user4.address, amount)
//           const res = await getPastEventsFromReceipt(await tx.wait(), 'withdrawn')
//           amountwith = res.amountWithdrawn
//         } catch (err) {
//           assert.fail(0, 1, err)
//         }

//         Amount = (amountwith - (deposit * 1e18))

//         ethMantissa = 1e18;

//         rewardByBlock = ((_supplyRatePerBlock * (deposit * 1e18)) / ethMantissa) * (blocksToMine + 3)

//         console.log({ Amount, rewardByBlock });

//         console.log({ toleranceBlock: (((rewardByBlock - Amount) / rewardByBlock) * 100) });


//       }).timeout('40s')
//       it(" #21 A stability user should not be able to deposit more than the maxUserSupplyinEth", async () => {
//         deposit = '150'
//         try {
//           await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
//         } catch (err) {
//           assert.fail(0, 1, err)
//         }
//         try {
//           await rseth.connect(user5).stake({ value: ethers.utils.parseEther(deposit) })
//           assert.fail(0, 1, 'Deposit Limit exceeded still can deposit')
//         } catch (err) {
//         }

//       })

//       it(" #22 A stability user should not be able to withdraw their collateral outside the withdrawal period", async () => {
//         //Already deposited in first step 
//         blocksToMine = (60) / (13.15)
//         let block = await web3.eth.getBlock('latest')
//         let time = block.timestamp
//         const amount = rseth.balanceOf(user4.address);
//         await rseth.connect(user4).requestRelease(amount)
//         await mineBlocks(blocksToMine);
//         block = await web3.eth.getBlock('latest')
//         time = block.timestamp - time;
//         expect(time).to.greaterThan(60)
//         expect(time).to.lessThan(180)
//         try {
//           await rseth.connect(user4).withdraw(user4.address, amount)
//           assert.fail(0, 1, 'Withdrawn before cooldown over')
//         } catch (err) { }
//       })

//       it(" #23 A stability user should be able to withdraw part of their collateral during the withdrawal period", async () => {
//         //Already deposited in first step 
//         blocksToMine = (180) / (13.15)
//         let block = await web3.eth.getBlock('latest')
//         let time = block.timestamp
//         const amount = rseth.balanceOf(user4.address);
//         await rseth.connect(user4).requestRelease(amount)
//         await mineBlocks(blocksToMine);
//         block = await web3.eth.getBlock('latest')
//         time = block.timestamp - time;
//         expect(time).to.greaterThan(180)
//         expect(time).to.lessThan(500)
//         try {
//           const tx = await rseth.connect(user4).withdraw(user4.address, amount)
//           const res = await getPastEventsFromReceipt(await tx.wait(), 'withdrawn')
//           expect(BigNumber.from(res.amountWithdrawn)).to.be.within(BigNumber.from(ethers.utils.parseEther(deposit)), BigNumber.from(ethers.utils.parseEther(deposit + 0.01 * deposit)))
//         } catch (err) {
//           assert.fail(0, 1, err)
//         }
//       })
//       it(" #24 A stability user should not be able to withdraw more than the released collateral inside the withdrawal period", async () => {
//         deposit = '150'
//         withdrawReq = '100'
//         withdraw = '101'
//         try {
//           await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
//         } catch (err) {
//           assert.fail(0, 1, err)
//         }
//         blocksToMine = (180) / (13.15)
//         let block = await web3.eth.getBlock('latest')
//         let time = block.timestamp
//         await ceth.connect(deploySigner).exchangeRateCurrent()
//         let exchangeRate = await ceth.exchangeRateStored()
//         const amount = BigNumber.from(ethers.utils.parseEther(withdrawReq)).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate)
//         await rseth.connect(user4).requestRelease(amount)
//         await mineBlocks(blocksToMine);
//         block = await web3.eth.getBlock('latest')
//         time = block.timestamp - time;
//         expect(time).to.greaterThan(180)
//         expect(time).to.lessThan(500)
//         await ceth.connect(deploySigner).exchangeRateCurrent()
//         exchangeRate = await ceth.exchangeRateStored()
//         try {
//           const amountOut = ethers.utils.parseEther(withdraw).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate);
//           expect(parseInt(amountOut)).to.greaterThan(parseInt(amount))
//           const tx = await rseth.connect(user4).withdraw(user4.address, amountOut)
//           assert.fail(0, 1, 'Withraw Success')
//         } catch (err) {
//           //success
//           expect(err.toString().substr(94, 30)).to.equal("You requested for lower amount")
//           //reset user 4

//           blocksToMine = (180) / (13.15)
//           let block = await web3.eth.getBlock('latest')
//           let time = block.timestamp
//           const amount = rseth.balanceOf(user4.address);
//           await rseth.connect(user4).requestRelease(amount)
//           await mineBlocks(blocksToMine);
//           block = await web3.eth.getBlock('latest')
//           time = block.timestamp - time;
//           expect(time).to.greaterThan(180)
//           expect(time).to.lessThan(500)
//           try {
//             const tx = await rseth.connect(user4).withdraw(user4.address, amount)
//           } catch (err) {
//             assert.fail(0, 1, err)
//           }
//         }
//       })
//       it(" #25 A stability user should not be able to withdraw collateral after the withdrawPeriod period has ended", async () => {
//         deposit = '150'
//         withdrawReq = '100'
//         withdraw = '100'
//         try {
//           await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
//         } catch (err) {
//           assert.fail(0, 1, err)
//         }
//         blocksToMine = (500) / (13.15)
//         let block = await web3.eth.getBlock('latest')
//         let time = block.timestamp
//         await ceth.connect(deploySigner).exchangeRateCurrent()
//         let exchangeRate = await ceth.exchangeRateStored()
//         const amount = BigNumber.from(ethers.utils.parseEther(withdrawReq)).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate)
//         await rseth.connect(user4).requestRelease(amount)
//         await mineBlocks(blocksToMine);
//         block = await web3.eth.getBlock('latest')
//         time = block.timestamp - time;
//         expect(time).to.greaterThan(500)
//         await ceth.connect(deploySigner).exchangeRateCurrent()
//         exchangeRate = await ceth.exchangeRateStored()
//         try {
//           const amountOut = ethers.utils.parseEther(withdraw).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate);
//           expect(parseInt(amountOut)).to.lessThan(parseInt(amount))
//           const tx = await rseth.connect(user4).withdraw(user4.address, amountOut)
//           assert.fail(0, 1, 'Withdraw successful even after claim period is over')
//         } catch (err) {
//           //success
//           expect(err.toString().substr(93, 30)).to.equal("'Claim Period Over'")
//           //reset user 4

//           blocksToMine = (180) / (13.15)
//           let block = await web3.eth.getBlock('latest')
//           let time = block.timestamp
//           const amount = rseth.balanceOf(user4.address);
//           await rseth.connect(user4).requestRelease(amount)
//           await mineBlocks(blocksToMine);
//           block = await web3.eth.getBlock('latest')
//           time = block.timestamp - time;
//           expect(time).to.greaterThan(180)
//           expect(time).to.lessThan(500)
//           try {
//             const tx = await rseth.connect(user4).withdraw(user4.address, amount)
//           } catch (err) {
//             assert.fail(0, 1, err)
//           }
//         }
//       })
//       it(" #26 A stability user, when withdrawing, should be given access to all harvests (including the last harvest)", async () => {
//         deposit = '100'
//         blocksToMine = 60 * 60 / 13.15
//         try {
//           await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
//           await reth.connect(user5).deposit({ value: ethers.utils.parseEther('1') })
//         } catch (err) {
//           assert.fail(0, 1, err)
//         }
//         await reth.connect(deploySigner).rebalance()

//         await mineBlocks(blocksToMine);

//         await earnHarvestRewards()

//         await reth.connect(deploySigner).harvest()

//         const userData = await reth.userData(rseth.address);
//         //withdraw all
//         blocksToMine = (180) / (13.15)
//         let block = await web3.eth.getBlock('latest')
//         let time = block.timestamp
//         const amount = await rseth.balanceOf(user4.address);
//         const a2 = await reth.balanceOf(rseth.address)
//         expect(parseInt(a2)).to.greaterThan(parseInt(amount))
//         await rseth.connect(user4).requestRelease(amount)
//         await mineBlocks(blocksToMine);
//         block = await web3.eth.getBlock('latest')
//         time = block.timestamp - time;
//         expect(time).to.greaterThan(180)
//         expect(time).to.lessThan(500)
//         try {
//           const tx = await rseth.connect(user4).withdraw(user4.address, amount)
//           const rx = await tx.wait()
//           const returnValues = await getPastEventsFromReceipt(rx, 'withdrawn')
//           const finalBalance = await reth.balanceOf(rseth.address)
//           expect(parseInt(finalBalance)).to.equal(0)
//         } catch (err) {
//           assert.fail(0, 1, err)
//         }
//       }).timeout('100s')
//     })
//   }
//   await stabilityTestCases();
// }

// async function commitingUserCases() {
//   describe("User Commit cases", async function () {
//     it("#28 A committer can commit a single user", async () => {
//       //1 Take Loan
//       const amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(40).div(100))
//       await reth.connect(user6).takeLoan(amtLoan, { value: ethers.utils.parseEther('100') })
//       //2 rebalance
//       await reth.connect(deploySigner).rebalance()
//       //3 time travel
//       const blocksToMine = 2000 / 13.15
//       await mineBlocks(blocksToMine)
//       //harvest rewards
//       await earnHarvestRewards()
//       //4 harvest
//       await reth.connect(deploySigner).harvest()
//       //5 mine one block //Not possible
//       await mineBlocks(500 / 13.15)
//       //6 harvest
//       await reth.connect(deploySigner).harvest()
//       //7 Commit user
//       const harvestIndex = await reth.index()
//       console.log(harvestIndex);
//       await reth.connect(deploySigner).commitUsers([user6.address], harvestIndex - 1)
//     })
//   })
// }

// async function communityUserCases() {
//   describe("Community User cases", async function () {
//     it("#32 A community user can claim rewards", async () => {
//       //1 Take Loan
//       const amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(20).div(100))
//       await reth.connect(user7).takeLoan(amtLoan, { value: ethers.utils.parseEther('100') })
//       //2 rebalance
//       await reth.connect(deploySigner).rebalance()
//       //3 time travel
//       const blocksToMine = 1000 / 13.15
//       await mineBlocks(blocksToMine)
//       //Claim rewards
//       tx = await reth.connect(deploySigner).claimRewards();
//       rx = await tx.wait()
//       res = await getPastEventsFromReceipt(rx, 'claimedVault')
//       expect(parseInt(res[1])).to.greaterThan(0)
//       expect(parseInt(res[2])).to.greaterThan(0)
//     }).timeout('60s')
//     it("#33 Claimed rewards are included in the harvest", async () => {
//       //All the steps before has been done in 33
//       const Erc20Abi = [
//         {
//           "inputs": [
//             {
//               "internalType": "address",
//               "name": "account",
//               "type": "address"
//             }
//           ],
//           "name": "balanceOf",
//           "outputs": [
//             {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         }
//       ]
//       const compAddress = "0xc00e94cb662c3520282e6f5717214004a7f26888"
//       const farmAddress = "0xa0246c9032bC3A600820415aE600c6388619A14D"
//       compContract = new ethers.Contract(compAddress, Erc20Abi, user7)
//       farmContract = new ethers.Contract(farmAddress, Erc20Abi, user7)
//       //harvest
//       await reth.connect(deploySigner).harvest()

//       const compAfterHarvest = await compContract.balanceOf(reth.address)
//       const farmAfterHarvest = await farmContract.balanceOf(reth.address)
//       expect(compAfterHarvest).to.equal(0)
//       expect(farmAfterHarvest).to.equal(0)
//     }).timeout('60s')
//     it("#34 A harvest can only be run if next time more than minHarvestTime ", async () => {
//       console.log("REDEPLOYING THE CONTRACTS");
//       await resetFork()
//       // harvest once 
//       await reth.connect(deploySigner).harvest()
//       //1 Take Loan
//       const amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(20).div(100))
//       await reth.connect(user7).takeLoan(amtLoan, { value: ethers.utils.parseEther('100') })
//       //2 rebalance
//       await reth.connect(deploySigner).rebalance()
//       //3 time travel
//       const blocksToMine = 200 / 13.15
//       await mineBlocks(blocksToMine)
//       //4 harvest
//       try {
//         await reth.connect(deploySigner).harvest()
//         assert.fail(0, 1, 'Transaction went through')
//       } catch (err) {
//         //success
//         expect(err.toString().substr(93, 30)).to.equal("'TIME00'")
//       }
//     }).timeout('60s')
//     it("A user should receive rewards from the harvest", async () => {
//       deposit = "100"
//       blocksToMine = 100//6570 //((60*60*24)/13.15)
//       await reth.connect(user2).deposit({ value: ethers.utils.parseEther(deposit) })
//       await reth.connect(deploySigner).rebalance()
//       await mineBlocks(blocksToMine)
//       await reth.connect(deploySigner).harvest()
//       await earnHarvestRewards()
//       await mineBlocks(blocksToMine)
//       await reth.connect(deploySigner).harvest()
//       bal = await reth.balanceOf(user2.address);
//       await reth.connect(user2).withdraw(bal)
//     }).timeout('100s')
    
//   })
// }
// async function emergencyPauseCases() {
//   describe("Emergency Pause Cases", async function () {
//     it("#43 No new supplies or borrows can take place when an emergency pause has been triggered", async () => {
//       // Multisig Pause
//       await reth.connect(deploySigner).pause();

//       // Alice Takes Loan\
//       const AliceAmtLoan = await ethToDai(
//         ethers.utils.parseEther("100").mul(20).div(100)
//       );
//       console.log("amount is" + AliceAmtLoan);

//       await expect(
//         reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
//           value: ethers.utils.parseEther("20"),
//         })
//       ).to.be.revertedWith("Pausable: paused");

//       // Bob Supply 100 ETH
//       await expect(
//         reth.connect(Bob).deposit({ value: ethers.utils.parseEther("100") })
//       ).to.be.revertedWith("Pausable: paused");
//     });

//     it("#44 Repay and Withdraws can take place when an emergency pause has been triggered", async () => {
//       await reth.connect(deploySigner).unpause();
//       // Alice take Loan 100ETH 20%
//       const AliceAmtLoan = await ethToDai(
//         ethers.utils.parseEther("100").mul(20).div(100)
//       );
//       console.log("amount is" + AliceAmtLoan);

//       await reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
//         value: ethers.utils.parseEther("100"),
//       });

//       // Multisig Pause
//       await reth.connect(deploySigner).pause();

//       // Alice repay
//       const AliceAmtRepay = await ethToDai(ethers.utils.parseEther("20"));
//       console.log("amount is" + AliceAmtRepay);
//       await expect(
//         reth.connect(Alice).repay(deploySigner, AliceAmtRepay.toPrecision(23), {
//           value: ethers.utils.parseEther("20"),
//         })
//       ).to.be.revertedWith("Pausable: paused");

//       // Alice withdraw
//       await expect(
//         reth.connect(Alice).withdraw(ethers.utils.parseEther("100"))
//       ).to.be.revertedWith("Pausable: paused");
//     });

//     it("#45 No new actions can be taken when an emergency pause has been triggered", async () => {
//       // await reth.connect(deploySigner).unpause();
//       // Alice Take Loan
//       let AliceAmtLoan = await ethToDai(
//         ethers.utils.parseEther("50").mul(20).div(100)
//       );
//       console.log("amount is" + AliceAmtLoan);

//       await reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
//         value: ethers.utils.parseEther("50"),
//       });

//       // Multisig Pause All
//       await reth.connect(deploySigner).pauseAll();

//       // Alice Take Loan
//       AliceAmtLoan = await ethToDai(
//         ethers.utils.parseEther("50").mul(20).div(100)
//       );
//       console.log("amount is" + AliceAmtLoan);

//       await expect(
//         reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
//           value: ethers.utils.parseEther("50"),
//         })
//       ).to.be.revertedWith("Pausable: paused");

//       // Bob supply
//       await expect(
//         reth.connect(Bob).deposit({ value: ethers.utils.parseEther("100") })
//       ).to.be.revertedWith("Pausable: paused");

//       // Alice Repay
//       await expect(
//         reth
//           .connect(Alice)
//           .repay(deploySigner, 0, { value: ethers.utils.parseEther("0") })
//       ).to.be.revertedWith("Pausable: paused");

//       // Alice withdraw
//       await expect(
//         reth.connect(Bob).withdraw(ethers.utils.parseEther("10"))
//       ).to.be.revertedWith("Pausable: paused");
//     });
//   });
// }

// async function changeSettingsCases() {
//   describe("Change Settings Cases", async function () {
//     it("#41 Settings can be changed by the multisig", async () => {
//       await controller.connect(deploySigner).setCollateralFactorRefi(100);

//       await reth.connect(deploySigner).setConfig(100, 100, 100, 10, 5);

//       await controller.connect(deploySigner)._setCloseFactor(100);

//       await controller.connect(deploySigner)._setLiquidationIncentive(102);

//       await evaluator
//         .connect(deploySigner)
//         .changeDepositRestrictions(
//           ethers.utils.parseEther("200"),
//           ethers.utils.parseEther("500"),
//           ethers.utils.parseEther("200")
//         );

//       await rseth.connect(deploySigner).setPeriods(200, 300);
//     });
//     it("#42 Settings Can't be changed by anyone other than multisig", async () => {
//       await expect(
//         controller.connect(user2).setCollateralFactorRefi(100)
//       ).to.be.revertedWith("not Authorised");

//       await expect(
//         reth.connect(user2).setConfig(100, 100, 100, 10, 5)
//       ).to.be.revertedWith("Ownable: caller is not the owner");

//       await expect(
//         controller.connect(user2)._setCloseFactor(100)
//       ).to.be.revertedWith("only admin can set close factor");

//       await expect(controller.connect(user2)._setLiquidationIncentive(110));

//       let val = await controller.liquidationIncentiveMantissa();
//       expect(val).to.be.equal(102);

//       await expect(
//         evaluator
//           .connect(user2)
//           .changeDepositRestrictions(
//             ethers.utils.parseEther("200"),
//             ethers.utils.parseEther("500"),
//             ethers.utils.parseEther("200")
//           )
//       ).to.be.revertedWith("Ownable: caller is not the owner");

//       await expect(
//         rseth.connect(user2).setPeriods(200, 300)
//       ).to.be.revertedWith("Ownable: caller is not the owner");
//     });
//   });
// }

// async function oracleCases() {
//   let oracleN;
//   describe("Oracle Test Cases", async function () {
//     it('Configure for oracle test Cases', async () => {
//       const OracleN = await ethers.getContractFactory("retrieve");
//       oracleN = await OracleN.deploy();
//       console.log("oracleN deployed to:", oracleN.address);
//       await oracleN.connect(deploySigner).setAnswer(ethers.utils.parseEther("0.5"));
//       rswap.connect(deploySigner).changeOracleTest(oracleN.address)
//     })
//     it("#35 An oracle mismatch will allow an emergency withdraw to trigger", async () => {
//       const amtLoan = await ethToDai(
//         ethers.utils.parseEther("100").mul(20).div(100)
//       );
//       await reth.connect(user2).takeLoan(amtLoan, {
//         value: ethers.utils.parseEther("100"),
//       });

//       await reth.connect(deploySigner).rebalance();

//       const blocksToMine = 2000 / 13.15;
//       await mineBlocks(blocksToMine);

//       // change price
//       reth.connect(deploySigner).emergencyWithdraw();
//     }).timeout('100s');

//     it("#36 After an oracle mismatch no further funds will be deposited", async () => {
//       await resetFork()
//       const OracleN = await ethers.getContractFactory("retrieve");
//       oracleN = await OracleN.deploy();
//       console.log("oracleN deployed to:", oracleN.address);
//       await oracleN.connect(deploySigner).setAnswer(ethers.utils.parseEther("0.5"));
//       rswap.connect(deploySigner).changeOracleTest(oracleN.address)
//       const amtLoan = await ethToDai(
//         ethers.utils.parseEther("100").mul(20).div(100)
//       );
//       await reth.connect(user2).takeLoan(amtLoan, {
//         value: ethers.utils.parseEther("100"),
//       });

//       await reth.connect(deploySigner).rebalance();

//       const blocksToMine = 2000 / 13.15;
//       await mineBlocks(blocksToMine);

//       // Change price - already changed

//       reth.connect(deploySigner).emergencyWithdraw();
//       try {
//         await reth.connect(deploySigner).rebalance();
//         assert.fail(0, 1, 'Transaction executed even when paused')
//       } catch (err) {
//         expect(err.toString().substr(94, 30)).to.equal("Pausable: paused")
//       }
//     }).timeout('100s');

//     it("#37 After oracles recover funds will be deposited again #BLOCKED", async () => {
//       await resetFork()
//       const OracleN = await ethers.getContractFactory("retrieve");
//       oracleN = await OracleN.deploy();
//       console.log("oracleN deployed to:", oracleN.address);
//       await oracleN.connect(deploySigner).setAnswer(ethers.utils.parseEther("0.5"));
//       rswap.connect(deploySigner).changeOracleTest(oracleN.address)
//       const amtLoan = await ethToDai(
//         ethers.utils.parseEther("100").mul(20).div(100)
//       );
//       await reth.connect(user2).takeLoan(amtLoan, {
//         value: ethers.utils.parseEther("100"),
//       });

//       await reth.connect(deploySigner).rebalance();

//       const blocksToMine = 2000 / 13.15;
//       await mineBlocks(blocksToMine);

//       // Change price

//       reth.connect(deploySigner).emergencyWithdraw();

//       // Change price
//       await oracleN.connect(deploySigner).setAnswer(ethers.utils.parseEther("1"));

//       await reth.connect(deploySigner).rebalance();
//     }).timeout('100s');
//   });
// }
// async function claimRewardsCheck(){
//   describe('Special Case',async()=>{
//     it("Setting up condition for checking claim rewards", async () => {
//       //1 Take Loan
//       const amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(20).div(100))
//       await reth.connect(user7).deposit({ value: ethers.utils.parseEther('100') })
//       //2 rebalance
//       await reth.connect(deploySigner).rebalance()
//       //3 time travel
//       const blocksToMine = 1000 / 13.15
//       await mineBlocks(blocksToMine)
//       //Claim rewards
//       tx = await reth.connect(deploySigner).claimRewards();
//       rx = await tx.wait()
//       res = await getPastEventsFromReceipt(rx, 'claimedVault')
//       expect(parseInt(res[1])).to.greaterThan(0)
//       expect(parseInt(res[2])).to.greaterThan(0)
//     }).timeout('60s')
//     it("#33 Claimed rewards are included in the harvest", async () => {
//       //All the steps before has been done in 33
//       const Erc20Abi = [
//         {
//           "inputs": [
//             {
//               "internalType": "address",
//               "name": "account",
//               "type": "address"
//             }
//           ],
//           "name": "balanceOf",
//           "outputs": [
//             {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         }
//       ]
//       const compAddress = "0xc00e94cb662c3520282e6f5717214004a7f26888"
//       const farmAddress = "0xa0246c9032bC3A600820415aE600c6388619A14D"
//       compContract = new ethers.Contract(compAddress, Erc20Abi, user7)
//       farmContract = new ethers.Contract(farmAddress, Erc20Abi, user7)
//       //harvest
//       await reth.connect(deploySigner).harvest()

//       const compAfterHarvest = await compContract.balanceOf(reth.address)
//       const farmAfterHarvest = await farmContract.balanceOf(reth.address)
//       expect(compAfterHarvest).to.equal(0)
//       expect(farmAfterHarvest).to.equal(0)
//     }).timeout('60s')
//   })
// }
// async function liquidationCases(){
//   describe('Liquidation gas test', async () =>{
//     await reth.connect(user2).takeLoan(ethToDai(ethers.utils.parseEther('1')),{value : ethers.utils.parseEther('1')})
//   })
// }
// async function frontendFailing(){
//   describe('manual test debug',async()=>{
//     it('manul test',async()=>{
//     //   await reth.connect(user2).deposit({value : ethers.utils.parseEther('10')
//     // })
//     console.log({price : (await oracle.getUnderlyingPrice(cdai.address)).toString()});
//   })})
// }

// describe("Deploy & Test Contracts", async function () {
//   it("deployment of contracts", async function () {
//     await getAddresses();
//     await deploy();
//   })
//   it("Testing Contracts", async function () {
//     //await checkReth();
//     //await stabilityUserCheck();
//     //await commitingUserCases();
//     //await communityUserCases();
//     //await oracleCases();
//     //await claimRewardsCheck()

//     await frontendFailing()
//   })
// })







// //Helpers
// async function earnHarvestRewards() {
//   const stratAbi = [{ "inputs": [{ "internalType": "address", "name": "_storage", "type": "address" }, { "internalType": "address", "name": "_vault", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "Liquidating", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "profitAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "feeAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "ProfitAndBuybackLog", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "profitAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "feeAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "ProfitLogInReward", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "ProfitsNotCollected", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "WETH2underlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__aave", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__comp", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__dai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__idle", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__idleUnderlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__stkaave", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allowedRewardClaimable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "claimAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "claimReward", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "controller", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "depositArbCheck", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "doHardWork", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "governance", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "idleTokenHelper", "outputs": [{ "internalType": "contract IIdleTokenHelper", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "idleUnderlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "investAllUnderlying", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "investedUnderlyingBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "multiSig", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingDenominator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingNumerator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "protected", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "referral", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "reward2WETH", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rewardTokens", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "salvage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "sell", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "_claimAllowed", "type": "bool" }], "name": "setClaimAllowed", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "bool", "name": "_sell", "type": "bool" }], "name": "setLiquidation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "setMultiSig", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "_protected", "type": "bool" }], "name": "setProtected", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_newRef", "type": "address" }], "name": "setReferral", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "flag", "type": "bool" }], "name": "setRewardClaimable", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_store", "type": "address" }], "name": "setStorage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "stkaave", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "store", "outputs": [{ "internalType": "contract Storage", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "sushiswapRouterV2", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "underlying", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "uniswapRouterV2", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "unsalvagableTokens", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "useUni", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "vault", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "virtualPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "weth", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawAllToVault", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amountUnderlying", "type": "uint256" }], "name": "withdrawToVault", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
//   const stratAddress = "0x9f357122F72a056E8A58CE89d3D88f62411c465C";
//   const stratContract = await new ethers.Contract(stratAddress, stratAbi, harvestGov)
//   await stratContract.connect(harvestGov).doHardWork()
// }
// async function getPastEventsFromReceipt(receipt, event) {

//   logs = receipt.events;
//   var value

//   logs.forEach((log) => {
//     if (log.event == event) {
//       value = log.args;
//       return
//     }
//   })

//   return value;
// }
// async function mineBlocks(blockNumber) {

//   block = await web3.eth.getBlock('latest')
//   time = block.timestamp

//   while (blockNumber > 0) {
//     blockNumber--;
//     time += 13.5
//     await network.provider.send("evm_mine", [time])
//   }
// }
// async function ethToDai(amount) {
//   const ethUSD = await oracle.getUnderlyingPrice("0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5")
//   const daiUSD = await oracle.getUnderlyingPrice("0x5d3a536e4d6dbd6114cc1ead35777bab948e3643")
//   return amount.mul(ethUSD).div(daiUSD);
// }