//testing mainnet
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const Web3 = require("web3");
const hre = require("hardhat");
const axios = require('axios');
const truffleAssert = require('truffle-assertions');
const BigNumber = ethers.BigNumber

const contAbi = [{ "inputs": [{ "internalType": "address", "name": "_storage", "type": "address" }, { "internalType": "address", "name": "_feeRewardForwarder", "type": "address" }, { "internalType": "address[]", "name": "_whitelist", "type": "address[]" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "vault", "type": "address" }, { "indexed": true, "internalType": "address", "name": "strategy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "oldSharePrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newSharePrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "SharePriceChangeLog", "type": "event" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "addCodeToWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_worker", "type": "address" }], "name": "addHardWorker", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "_targets", "type": "address[]" }], "name": "addMultipleToWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "addToWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_vault", "type": "address" }, { "internalType": "address", "name": "_strategy", "type": "address" }], "name": "addVaultAndStrategy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "codeWhitelist", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_vault", "type": "address" }], "name": "doHardWork", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeRewardForwarder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "a", "type": "address" }], "name": "getContractHash", "outputs": [{ "internalType": "bytes32", "name": "hash", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "governance", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "greyList", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "hardRewards", "outputs": [{ "internalType": "contract IHardRewards", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "hardWorkers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "multiSig", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "notifyFee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingDenominator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingNumerator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "removeCodeFromWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "removeFromWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_worker", "type": "address" }], "name": "removeHardWorker", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "_targets", "type": "address[]" }], "name": "removeMultipleFromWhitelist", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "salvage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_strategy", "type": "address" }, { "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "salvageStrategy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeRewardForwarder", "type": "address" }], "name": "setFeeRewardForwarder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_hardRewards", "type": "address" }], "name": "setHardRewards", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_store", "type": "address" }], "name": "setStorage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "store", "outputs": [{ "internalType": "contract Storage", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "whitelist", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }]
const contaddress = "0x3cC47874dC50D98425ec79e647d83495637C55e3";

const compContAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"action","type":"string"},{"indexed":false,"internalType":"bool","name":"pauseState","type":"bool"}],"name":"ActionPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":false,"internalType":"string","name":"action","type":"string"},{"indexed":false,"internalType":"bool","name":"pauseState","type":"bool"}],"name":"ActionPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldCompAccrued","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newCompAccrued","type":"uint256"}],"name":"CompAccruedAdjusted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"newSpeed","type":"uint256"}],"name":"CompBorrowSpeedUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CompGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldCompReceivable","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newCompReceivable","type":"uint256"}],"name":"CompReceivableUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"newSpeed","type":"uint256"}],"name":"CompSupplySpeedUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"newSpeed","type":"uint256"}],"name":"ContributorCompSpeedUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"compDelta","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"compBorrowIndex","type":"uint256"}],"name":"DistributedBorrowerComp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":true,"internalType":"address","name":"supplier","type":"address"},{"indexed":false,"internalType":"uint256","name":"compDelta","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"compSupplyIndex","type":"uint256"}],"name":"DistributedSupplierComp","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"error","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"info","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"detail","type":"uint256"}],"name":"Failure","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"MarketEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"MarketExited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract CToken","name":"cToken","type":"address"}],"name":"MarketListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"newBorrowCap","type":"uint256"}],"name":"NewBorrowCap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldBorrowCapGuardian","type":"address"},{"indexed":false,"internalType":"address","name":"newBorrowCapGuardian","type":"address"}],"name":"NewBorrowCapGuardian","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldCloseFactorMantissa","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newCloseFactorMantissa","type":"uint256"}],"name":"NewCloseFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract CToken","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldCollateralFactorMantissa","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newCollateralFactorMantissa","type":"uint256"}],"name":"NewCollateralFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldLiquidationIncentiveMantissa","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newLiquidationIncentiveMantissa","type":"uint256"}],"name":"NewLiquidationIncentive","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldPauseGuardian","type":"address"},{"indexed":false,"internalType":"address","name":"newPauseGuardian","type":"address"}],"name":"NewPauseGuardian","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract PriceOracle","name":"oldPriceOracle","type":"address"},{"indexed":false,"internalType":"contract PriceOracle","name":"newPriceOracle","type":"address"}],"name":"NewPriceOracle","type":"event"},{"constant":false,"inputs":[{"internalType":"contract Unitroller","name":"unitroller","type":"address"}],"name":"_become","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_borrowGuardianPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_grantComp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_mintGuardianPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newBorrowCapGuardian","type":"address"}],"name":"_setBorrowCapGuardian","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract CToken","name":"cToken","type":"address"},{"internalType":"bool","name":"state","type":"bool"}],"name":"_setBorrowPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newCloseFactorMantissa","type":"uint256"}],"name":"_setCloseFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract CToken","name":"cToken","type":"address"},{"internalType":"uint256","name":"newCollateralFactorMantissa","type":"uint256"}],"name":"_setCollateralFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract CToken[]","name":"cTokens","type":"address[]"},{"internalType":"uint256[]","name":"supplySpeeds","type":"uint256[]"},{"internalType":"uint256[]","name":"borrowSpeeds","type":"uint256[]"}],"name":"_setCompSpeeds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"contributor","type":"address"},{"internalType":"uint256","name":"compSpeed","type":"uint256"}],"name":"_setContributorCompSpeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newLiquidationIncentiveMantissa","type":"uint256"}],"name":"_setLiquidationIncentive","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract CToken[]","name":"cTokens","type":"address[]"},{"internalType":"uint256[]","name":"newBorrowCaps","type":"uint256[]"}],"name":"_setMarketBorrowCaps","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract CToken","name":"cToken","type":"address"},{"internalType":"bool","name":"state","type":"bool"}],"name":"_setMintPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newPauseGuardian","type":"address"}],"name":"_setPauseGuardian","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract PriceOracle","name":"newOracle","type":"address"}],"name":"_setPriceOracle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"state","type":"bool"}],"name":"_setSeizePaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"state","type":"bool"}],"name":"_setTransferPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract CToken","name":"cToken","type":"address"}],"name":"_supportMarket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"accountAssets","outputs":[{"internalType":"contract CToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allMarkets","outputs":[{"internalType":"contract CToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"borrowAmount","type":"uint256"}],"name":"borrowAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"borrowCapGuardian","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"borrowCaps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"borrowGuardianPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"borrowAmount","type":"uint256"}],"name":"borrowVerify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"contract CToken","name":"cToken","type":"address"}],"name":"checkMembership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"contract CToken[]","name":"cTokens","type":"address[]"}],"name":"claimComp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"holders","type":"address[]"},{"internalType":"contract CToken[]","name":"cTokens","type":"address[]"},{"internalType":"bool","name":"borrowers","type":"bool"},{"internalType":"bool","name":"suppliers","type":"bool"}],"name":"claimComp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"}],"name":"claimComp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"closeFactorMantissa","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compAccrued","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compBorrowSpeeds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compBorrowState","outputs":[{"internalType":"uint224","name":"index","type":"uint224"},{"internalType":"uint32","name":"block","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"compBorrowerIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compContributorSpeeds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"compInitialIndex","outputs":[{"internalType":"uint224","name":"","type":"uint224"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"compRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compReceivable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compSpeeds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"compSupplierIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compSupplySpeeds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compSupplyState","outputs":[{"internalType":"uint224","name":"index","type":"uint224"},{"internalType":"uint32","name":"block","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"comptrollerImplementation","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"cTokens","type":"address[]"}],"name":"enterMarkets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cTokenAddress","type":"address"}],"name":"exitMarket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"affectedUsers","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"fixBadAccruals","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllMarkets","outputs":[{"internalType":"contract CToken[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAssetsIn","outputs":[{"internalType":"contract CToken[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCompAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"cTokenModify","type":"address"},{"internalType":"uint256","name":"redeemTokens","type":"uint256"},{"internalType":"uint256","name":"borrowAmount","type":"uint256"}],"name":"getHypotheticalAccountLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isComptroller","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"contract CToken","name":"cToken","type":"address"}],"name":"isDeprecated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastContributorBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cTokenBorrowed","type":"address"},{"internalType":"address","name":"cTokenCollateral","type":"address"},{"internalType":"address","name":"liquidator","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"repayAmount","type":"uint256"}],"name":"liquidateBorrowAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cTokenBorrowed","type":"address"},{"internalType":"address","name":"cTokenCollateral","type":"address"},{"internalType":"address","name":"liquidator","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"actualRepayAmount","type":"uint256"},{"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"name":"liquidateBorrowVerify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"cTokenBorrowed","type":"address"},{"internalType":"address","name":"cTokenCollateral","type":"address"},{"internalType":"uint256","name":"actualRepayAmount","type":"uint256"}],"name":"liquidateCalculateSeizeTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"liquidationIncentiveMantissa","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"markets","outputs":[{"internalType":"bool","name":"isListed","type":"bool"},{"internalType":"uint256","name":"collateralFactorMantissa","type":"uint256"},{"internalType":"bool","name":"isComped","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"minter","type":"address"},{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"mintAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mintGuardianPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"minter","type":"address"},{"internalType":"uint256","name":"actualMintAmount","type":"uint256"},{"internalType":"uint256","name":"mintTokens","type":"uint256"}],"name":"mintVerify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"oracle","outputs":[{"internalType":"contract PriceOracle","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pauseGuardian","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingComptrollerImplementation","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposal65FixExecuted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"redeemer","type":"address"},{"internalType":"uint256","name":"redeemTokens","type":"uint256"}],"name":"redeemAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"redeemer","type":"address"},{"internalType":"uint256","name":"redeemAmount","type":"uint256"},{"internalType":"uint256","name":"redeemTokens","type":"uint256"}],"name":"redeemVerify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"repayAmount","type":"uint256"}],"name":"repayBorrowAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"actualRepayAmount","type":"uint256"},{"internalType":"uint256","name":"borrowerIndex","type":"uint256"}],"name":"repayBorrowVerify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cTokenCollateral","type":"address"},{"internalType":"address","name":"cTokenBorrowed","type":"address"},{"internalType":"address","name":"liquidator","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"name":"seizeAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"seizeGuardianPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cTokenCollateral","type":"address"},{"internalType":"address","name":"cTokenBorrowed","type":"address"},{"internalType":"address","name":"liquidator","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"name":"seizeVerify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"transferTokens","type":"uint256"}],"name":"transferAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transferGuardianPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"cToken","type":"address"},{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"transferTokens","type":"uint256"}],"name":"transferVerify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"contributor","type":"address"}],"name":"updateContributorRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const compContAddress = "0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b"
let compCont;

const daiAbi = [{ "inputs": [{ "internalType": "uint256", "name": "chainId_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "guy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": true, "inputs": [{ "indexed": true, "internalType": "bytes4", "name": "sig", "type": "bytes4" }, { "indexed": true, "internalType": "address", "name": "usr", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "arg1", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "arg2", "type": "bytes32" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "deny", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "mint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "move", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "allowed", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "pull", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "push", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "rely", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "wards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
let dai;

const oracleAbi = [{ "inputs": [{ "internalType": "uint256", "name": "anchorToleranceMantissa_", "type": "uint256" }, { "internalType": "uint256", "name": "anchorPeriod_", "type": "uint256" }, { "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig[]", "name": "configs", "type": "tuple[]" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "anchorPrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "oldTimestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTimestamp", "type": "uint256" }], "name": "AnchorPriceUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "FailoverActivated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "FailoverDeactivated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "reporter", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "anchor", "type": "uint256" }], "name": "PriceGuarded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "PriceUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "oldTimestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTimestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "oldPrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newPrice", "type": "uint256" }], "name": "UniswapWindowUpdated", "type": "event" }, { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "activateFailover", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "anchorPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "deactivateFailover", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ethBaseUnit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "expScale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "i", "type": "uint256" }], "name": "getTokenConfig", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }], "name": "getTokenConfigByCToken", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "reporter", "type": "address" }], "name": "getTokenConfigByReporter", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "symbol", "type": "string" }], "name": "getTokenConfigBySymbol", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "getTokenConfigBySymbolHash", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "underlying", "type": "address" }], "name": "getTokenConfigByUnderlying", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "underlying", "type": "address" }, { "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }, { "internalType": "uint256", "name": "baseUnit", "type": "uint256" }, { "internalType": "enum UniswapConfig.PriceSource", "name": "priceSource", "type": "uint8" }, { "internalType": "uint256", "name": "fixedPrice", "type": "uint256" }, { "internalType": "address", "name": "uniswapMarket", "type": "address" }, { "internalType": "address", "name": "reporter", "type": "address" }, { "internalType": "uint256", "name": "reporterMultiplier", "type": "uint256" }, { "internalType": "bool", "name": "isUniswapReversed", "type": "bool" }], "internalType": "struct UniswapConfig.TokenConfig", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }], "name": "getUnderlyingPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lowerBoundAnchorRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "newObservations", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "acc", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "oldObservations", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "acc", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "symbolHash", "type": "bytes32" }], "name": "pokeFailedOverPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "symbol", "type": "string" }], "name": "price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "prices", "outputs": [{ "internalType": "uint248", "name": "price", "type": "uint248" }, { "internalType": "bool", "name": "failoverActive", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "upperBoundAnchorRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "int256", "name": "currentAnswer", "type": "int256" }], "name": "validate", "outputs": [{ "internalType": "bool", "name": "valid", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]
const oracleAddress = "0x046728da7cb8272284238bD3e47909823d63A58D";
let oracle;

const cethAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "mint", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "repayBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "initialExchangeRateMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }, { "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "liquidator", "type": "address" }, { "name": "borrower", "type": "address" }, { "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }], "name": "repayBorrowBehalf", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "comptroller_", "type": "address" }, { "name": "interestRateModel_", "type": "address" }, { "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "name": "name_", "type": "string" }, { "name": "symbol_", "type": "string" }, { "name": "decimals_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "minter", "type": "address" }, { "indexed": false, "name": "mintAmount", "type": "uint256" }, { "indexed": false, "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "redeemer", "type": "address" }, { "indexed": false, "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "payer", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "liquidator", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldComptroller", "type": "address" }, { "indexed": false, "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "error", "type": "uint256" }, { "indexed": false, "name": "info", "type": "uint256" }, { "indexed": false, "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event" }]
const cethaddress = "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5"
let ceth;

const cdaiAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "mint", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, {"constant":false,"inputs":[{"name":"repayAmount","type":"uint256"}],"name":"repayBorrow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "initialExchangeRateMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }, { "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "liquidator", "type": "address" }, { "name": "borrower", "type": "address" }, { "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }], "name": "repayBorrowBehalf", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "comptroller_", "type": "address" }, { "name": "interestRateModel_", "type": "address" }, { "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "name": "name_", "type": "string" }, { "name": "symbol_", "type": "string" }, { "name": "decimals_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "minter", "type": "address" }, { "indexed": false, "name": "mintAmount", "type": "uint256" }, { "indexed": false, "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "redeemer", "type": "address" }, { "indexed": false, "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "payer", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "liquidator", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldComptroller", "type": "address" }, { "indexed": false, "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "error", "type": "uint256" }, { "indexed": false, "name": "info", "type": "uint256" }, { "indexed": false, "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event" }]
const cdaiaddress = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
let cdai;

const ExvaultAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Invest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newStrategy","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"StrategyAnnounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newStrategy","type":"address"},{"indexed":false,"internalType":"address","name":"oldStrategy","type":"address"}],"name":"StrategyChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_strategy","type":"address"}],"name":"announceStrategyUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"availableToInvestOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_strategy","type":"address"}],"name":"canUpdateStrategy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"holder","type":"address"}],"name":"depositFor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"doHardWork","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalizeStrategyUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalizeUpgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"futureStrategy","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_underlying","type":"address"},{"internalType":"uint256","name":"_toInvestNumerator","type":"uint256"},{"internalType":"uint256","name":"_toInvestDenominator","type":"uint256"},{"internalType":"uint256","name":"_underlyingUnit","type":"uint256"},{"internalType":"uint256","name":"_implementationChangeDelay","type":"uint256"},{"internalType":"uint256","name":"_strategyChangeDelay","type":"uint256"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_storage","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_storage","type":"address"},{"internalType":"address","name":"_underlying","type":"address"},{"internalType":"uint256","name":"_toInvestNumerator","type":"uint256"},{"internalType":"uint256","name":"_toInvestDenominator","type":"uint256"}],"name":"initializeVault","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextImplementation","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextImplementationDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextImplementationTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"rebalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"impl","type":"address"}],"name":"scheduleUpgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_store","type":"address"}],"name":"setStorage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_strategy","type":"address"}],"name":"setStrategy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"numerator","type":"uint256"},{"internalType":"uint256","name":"denominator","type":"uint256"}],"name":"setVaultFractionToInvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"shouldUpgrade","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"strategyTimeLock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"strategyUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"underlyingBalanceInVault","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"underlyingBalanceWithInvestment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"holder","type":"address"}],"name":"underlyingBalanceWithInvestmentForHolder","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"underlyingUnit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vaultFractionToInvestDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vaultFractionToInvestNumerator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"numberOfShares","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const ExvaultAddress = "0xab7FA2B2985BCcfC13c6D86b1D5A17486ab1e04C"
let Exvault;

const ExpoolAbi = [{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"address","name":"_rewardDistribution","type":"address"},{"internalType":"address","name":"_storage","type":"address"},{"internalType":"address","name":"_sourceVault","type":"address"},{"internalType":"address","name":"_migrationStrategy","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"legacyShare","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newShare","type":"uint256"}],"name":"Migrated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardDenied","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"smartContractAddress","type":"address"},{"indexed":true,"internalType":"address","name":"smartContractInitiator","type":"address"}],"name":"SmartContractRecorded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"canMigrate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"migrate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"migrationStrategy","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pullFromStrategy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"pushReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_canMigrate","type":"bool"}],"name":"setCanMigrate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_store","type":"address"}],"name":"setStorage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sourceVault","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"store","outputs":[{"internalType":"contract Storage","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const ExpoolAddress = "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A"
let Expool;

const Erc20Abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const compAddress = "0xc00e94cb662c3520282e6f5717214004a7f26888"
const farmAddress = "0xa0246c9032bC3A600820415aE600c6388619A14D"

let controller, rswap, reth, rseth, evaluator, compContract, farmContract;

var web3 = new Web3(hre.network.provider);
web3.eth.getChainId().then(res => console.log("Chain ID:", res));
let deploySigner, user2, user3, user4, user5, user6, user7, user8, harvestGov;




async function getAddresses() {
  [deploySigner, user2, user3, user4, user5, user6, user7, user8] = await ethers.getSigners();
  //deploySigner = owner;
  deploySigner.getAddress().then(res => console.log("Deployer : ", res))
  user2.getAddress().then(res => console.log("User 2 : ", res))
  user3.getAddress().then(res => console.log("User 3 : ", res))
  user4.getAddress().then(res => console.log("User 4 : ", res))
  user5.getAddress().then(res => console.log("User 5 : ", res))
  user6.getAddress().then(res => console.log("User 6 : ", res))
}
async function deploy() {
  oracle = new ethers.Contract(oracleAddress, oracleAbi, deploySigner)
  ceth = new ethers.Contract(cethaddress, cethAbi, deploySigner)
  cdai = new ethers.Contract(cdaiaddress, cdaiAbi, deploySigner)
  dai = new ethers.Contract(daiAddress, daiAbi, deploySigner)
  Exvault = new ethers.Contract(ExvaultAddress, ExvaultAbi, deploySigner)
  Expool = new ethers.Contract(ExpoolAddress, ExpoolAbi, deploySigner)
  compContract = new ethers.Contract(compAddress, Erc20Abi, deploySigner)
  farmContract = new ethers.Contract(farmAddress, Erc20Abi, deploySigner)
  compCont = new ethers.Contract(compContAddress, compContAbi, deploySigner)

  const Controller = await ethers.getContractFactory("contracts/controller.sol:Comptroller");
  controller = await Controller.deploy();
  console.log("Controller deployed to:", controller.address);

  const Rswap = await ethers.getContractFactory("rSwap");
  rswap = await Rswap.deploy();
  console.log("rswap deployed to:", rswap.address);

  const Reth = await ethers.getContractFactory("rETH");
  reth = await Reth.deploy(controller.address, rswap.address);
  console.log("reth deployed to:", reth.address);

  const Rseth = await ethers.getContractFactory("contracts/rseth.sol:rseth");
  rseth = await Rseth.deploy(reth.address);
  console.log("rseth deployed to:", rseth.address);

  const Evaluator = await ethers.getContractFactory("evaluator");
  evaluator = await Evaluator.deploy(reth.address, controller.address, rswap.address, rseth.address);

  console.log("evaluator deployed to:", evaluator.address);

  describe("Contracts Config", async function () {

    it("should set the Price Oracle", async function () {
      await controller.connect(deploySigner)._setPriceOracle("0x046728da7cb8272284238bD3e47909823d63A58D")
      expect(await controller.oracle()).to.equal("0x046728da7cb8272284238bD3e47909823d63A58D");
    })

    it("should change to new reth & evaluator ", async function () {
      await controller.connect(deploySigner).changeAddresses(reth.address, evaluator.address)
      expect(await controller.rEth()).to.equal(reth.address);
      expect(await controller.eval()).to.equal(evaluator.address);
    })
    // it("Should change R2C", async function () {
    //   await controller.connect(deploySigner).setR2C(reth.address, "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5", "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643");
    //   const res = await controller.R2C(reth.address)
    //   expect(res.ceth).to.equal("0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5");
    //   expect(res.cdai).to.equal("0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643");
    // })

    it("should update Addresses", async function () {
      await reth.connect(deploySigner).changeAddresses(controller.address, rseth.address, evaluator.address, "0x046728da7cb8272284238bD3e47909823d63A58D", rswap.address)
      //expect(await reth.stabilityUserContract()).to.equal(rseth.address);
      expect(await reth.RefiTroller()).to.equal(controller.address);
      //expect(await reth.eval()).to.equal(evaluator.address);
    })

    it("should set address and stake ", async function () {
      await rseth.connect(deploySigner).setAddress(evaluator.address)
      expect(await rseth.eval()).to.equal(evaluator.address);
      await evaluator.connect(deploySigner).doWhitelist(user4.address)
      let bal4 = await rseth.connect(user4).balanceOf(user4.address)
      await rseth.connect(user4).stake({ value: ethers.utils.parseEther('5') })
      let bal5 = await rseth.connect(user4).balanceOf(user4.address)
    })

    describe("whitelist reth", async function () {
      it("WhiteList Reth", async function () {
        await whiteListAdd();
      })
    })
    describe("Fund Dai", async function () {
      it("Fund dai by impersonating", async function () {
        const accountToInpersonate = "0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0"

        await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [accountToInpersonate],
        });

        await dai.connect(await ethers.getSigner(accountToInpersonate)).transfer(user2.address, ethers.utils.parseEther("9600000"))
        await dai.connect(await ethers.getSigner(accountToInpersonate)).transfer(deploySigner.getAddress(), ethers.utils.parseEther("9600000"))
        await dai.connect(await ethers.getSigner(accountToInpersonate)).transfer(reth.address, ethers.utils.parseEther("1"))
        //console.log("Adding Success");
        await hre.network.provider.request({
          method: "hardhat_stopImpersonatingAccount",
          params: [accountToInpersonate],
        });
      })
    })

  })
}
async function resetFork() {

  console.log("Redeploying Contracts");

  await network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: "https://eth-mainnet.alchemyapi.io/v2/C-VKiqty_uZlROJwGZ7PMKd0DGkI28Hz",
          blockNumber: 13574347,
        },
      },
    ],
  });  

  const accountToInpersonate = "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503"

        await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [accountToInpersonate],
        });

        await dai.connect(await ethers.getSigner(accountToInpersonate)).transfer(user2.address, ethers.utils.parseEther("9600000"))
        await dai.connect(await ethers.getSigner(accountToInpersonate)).transfer(deploySigner.getAddress(), ethers.utils.parseEther("9600000"))
        
        await hre.network.provider.request({
          method: "hardhat_stopImpersonatingAccount",
          params: [accountToInpersonate],
        });

  const Controller = await ethers.getContractFactory("contracts/controller.sol:Comptroller");
  controller = await Controller.deploy();
  // console.log("Controller deployed to:", controller.address);

  const Rswap = await ethers.getContractFactory("rSwap");
  rswap = await Rswap.deploy();
  // console.log("rswap deployed to:", rswap.address);

  const Reth = await ethers.getContractFactory("rETH");
  reth = await Reth.deploy(controller.address, rswap.address);
  // console.log("reth deployed to:", reth.address);

  const Rseth = await ethers.getContractFactory("contracts/rseth.sol:rseth");
  rseth = await Rseth.deploy(reth.address);
  // console.log("rseth deployed to:", rseth.address);

  const Evaluator = await ethers.getContractFactory("evaluator");
  evaluator = await Evaluator.deploy(reth.address, controller.address, rswap.address, rseth.address);

  // console.log("evaluator deployed to:", evaluator.address);

  await controller.connect(deploySigner)._setPriceOracle("0x046728da7cb8272284238bD3e47909823d63A58D")

  await controller.connect(deploySigner).changeAddresses(reth.address, evaluator.address)

  await reth.connect(deploySigner).changeAddresses(controller.address, rseth.address, evaluator.address, "0x046728da7cb8272284238bD3e47909823d63A58D", rswap.address)

  await whiteListAdd();
}


async function whiteListAdd() {

  const accountToInpersonate = "0xf00dD244228F51547f0563e60bCa65a30FBF5f7f"

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [accountToInpersonate],
  });
  harvestGov = await ethers.getSigner(accountToInpersonate)
  const ContContract = await new web3.eth.Contract(contAbi, contaddress);
  await ContContract.methods.addToWhitelist(reth.address).send({ from: accountToInpersonate })
  
  await evaluator.connect(deploySigner).doWhitelist(deploySigner.address)
  await evaluator.connect(deploySigner).doWhitelist(user2.address)
  await evaluator.connect(deploySigner).doWhitelist(user3.address)
  await evaluator.connect(deploySigner).doWhitelist(user4.address)
  await evaluator.connect(deploySigner).doWhitelist(user5.address)
  await evaluator.connect(deploySigner).doWhitelist(user6.address)
  await evaluator.connect(deploySigner).doWhitelist(user7.address)

  // //console.log("Adding Success");
  // await hre.network.provider.request({
  //   method: "hardhat_stopImpersonatingAccount",
  //   params: [accountToInpersonate],
  // });
  describe("Reth Should be Whitelisted", async function () {
    expect(await ContContract.methods.whitelist(reth.address).call()).to.equal(true);
  })

}
async function checkReth() {
  describe("Functions Check", async function () {
    async function basicCheck() {
      describe("Basic Check", async function () {
        it("Deposit 0.1 Ether", async function () {
          let overrides = {
            value: ethers.utils.parseEther("0.1")

          };
          await reth.connect(deploySigner).deposit(overrides);
          expect(parseInt(await reth.balanceOf(deploySigner.getAddress()))).to.be.greaterThan(0);
        })
        it("borrow 100 Dai", async function () {
          await reth.connect(deploySigner).borrow(ethers.utils.parseEther("100"));
          const res = await reth.accountBorrows(deploySigner.getAddress())
          expect(parseInt(ethers.utils.formatEther(res.principal))).to.be.equal(100);
        })

        it("repay all Dai", async function () {
          const daiContract = await new web3.eth.Contract(daiAbi, daiAddress);
          const res = await reth.borrowBalanceStored(await deploySigner.getAddress())
          //console.log(ethers.BigNumber.from(res._hex).mul(101).div(100));

          await daiContract.methods.approve(reth.address, res.mul(101).div(100)).send({ from: await deploySigner.getAddress() });

          await reth.connect(deploySigner).repayAll(await deploySigner.getAddress());
          const res2 = await reth.accountBorrows(deploySigner.getAddress())
          expect(res2.principal).to.be.equal(0);
        })

        it("TakeLoan - 1 Ether Deposit + 10 Dai borrow - Account 2", async function () {
          let overrides = {
            value: ethers.utils.parseEther("1")

          };
          const res0 = await reth.accountBorrows(user2.getAddress())
          await reth.connect(user2).takeLoan(ethers.utils.parseEther("10"), overrides)
          const res = await reth.accountBorrows(user2.getAddress())
          expect(parseInt(ethers.utils.formatEther(res.principal)) - parseInt(ethers.utils.formatEther(res0.principal))).to.be.equal(10);
          //console.log(parseInt(await reth.accountBorrows(deploySigner.getAddress())));
        })

        it("Withdraw all Eth ", async function () {
          await new Promise(resolve => setTimeout(resolve, 5000));
          const tx = await reth.connect(deploySigner).withdraw((await reth.balanceOf(deploySigner.getAddress())));
          let amount;
          const res = await tx.wait()
          amount = (res.events.find(x => x.event == 'withdrawn').args.amount)
          //console.log(amount.toString());
          expect(amount.toString()).to.be.within(BigNumber.from(ethers.utils.parseEther("0.1")), BigNumber.from(ethers.utils.parseEther("0.101")));
        })
      })
    }
    await basicCheck();

    async function extendedCheck() {
      describe("extended check", async function () {
        it("Deposit 1 Ether - Account 3", async function () {
          let overrides = {
            value: ethers.utils.parseEther("1")

          };
          await reth.connect(user3).deposit(overrides);
          expect(parseInt(await reth.balanceOf(user3.getAddress()))).to.be.greaterThan(0);
        })

        it("Should rebalance Condition #1 - LTV < minLTV", async function () {
          //If LTV < min LTV
          await evaluator.connect(deploySigner).vaultLTV()
          const res = await evaluator.vaultLTVStored();
          const store = await evaluator.store();
          expect(BigNumber.from(res)).to.be.within(BigNumber.from(0), BigNumber.from(store.minLTV)) //condition statisfied
          await reth.connect(deploySigner).rebalance()
          await evaluator.connect(deploySigner).vaultLTV()
          const res2 = await evaluator.vaultLTVStored();
          expect(BigNumber.from(res2)).to.be.within(BigNumber.from(store.tLTV), BigNumber.from(store.tLTV).mul(101).div(100))
        })
        it("Withdraw all Eth - Account 3", async function () {
          await new Promise(resolve => setTimeout(resolve, 5000));
          const tx = await reth.connect(user3).withdraw((await reth.balanceOf(user3.getAddress())));
          let amount;
          const res = await tx.wait()
          amount = (res.events.find(x => x.event == 'withdrawn').args.amount)
          //console.log(amount.toString());
          expect(amount.toString()).to.be.within(BigNumber.from(ethers.utils.parseEther("1")), BigNumber.from(ethers.utils.parseEther("1.01")));

        })
        it("Should rebalance Condition #2 - LTV > maxLTV ", async function () {
          //If LTV < min LTV
          await evaluator.connect(deploySigner).vaultLTV()
          const res = await evaluator.vaultLTVStored();          //console.log(res.toString());
          const store = await evaluator.store();
          if (BigNumber.from(res).gt(BigNumber.from(store.maxLTV))) {
            expect(BigNumber.from(res)).to.be.within(BigNumber.from(store.maxLTV), BigNumber.from(ethers.utils.parseEther("1")))
            await reth.connect(deploySigner).rebalance()
            await evaluator.connect(deploySigner).vaultLTV()
            const res2 = await evaluator.vaultLTVStored();
            expect(BigNumber.from(res2.toString())).to.be.within(BigNumber.from(store.tLTV).mul(99).div(100), BigNumber.from(store.tLTV).mul(101).div(100))
          }
        })
        it("Harvest without rewards ", async function () {
          await new Promise(resolve => setTimeout(resolve, 10000));
          const res0 = await reth.harvestIndex();
          await reth.connect(deploySigner).harvest();
          const res = await reth.harvestIndex();
          expect(parseInt(res)).to.be.equal(BigNumber.from(res0).add(BigNumber.from("1")))
        }).timeout(50000)
      })
    }
    await extendedCheck();
  })
}
async function testScenarios() {
  async function testCasesreth() {
    describe("Test cases", async function () {  
      
      it("#1 Collateral should earn interest", async () => {

        await resetFork()
        deposit = "100"
        blocksToMine = 1000//6570 //((60*60*24)/13.15)
  
        await reth.connect(user2).deposit({value: ethers.utils.parseEther(deposit)})
  
        await mineBlocks(blocksToMine)
  
        _supplyRatePerBlock = await ceth.supplyRatePerBlock();
  
        withdraw = await reth.connect(user2).withdraw(await reth.balanceOf(user2.address))
        withdraw = await withdraw.wait();
        
        receiptEvent = await getPastEventsFromReceipt(withdraw, 'withdrawn')
        Amount = (receiptEvent.amount - (deposit*1e18))
  
        ethMantissa = 1e18;
  
        // (100*100*1e18)/1e18 = 10000
  
        rewardByBlock = ((_supplyRatePerBlock*(deposit*1e18))/ethMantissa)*(blocksToMine+1)
        toleranceBlock = (((rewardByBlock - Amount)/rewardByBlock)*100)
  
        // console.log({Amount, rewardByBlock});
        // console.log({toleranceBlock:(((rewardByBlock - Amount)/rewardByBlock)*100)});
  
        // expect(Amount).to.equal(rewardByBlock) -- Ideally

        expect(toleranceBlock).to.be.lessThan(0.001)
  
      }).timeout('40s')

      it("#2 A user should receive the same amount of interest as Compound on their collateral", async () => {

        await resetFork()
        deposit = "100"
        blocksToMine = 100//6570 //((60*60*24)/13.15)
        
        await network.provider.send("evm_setAutomine", [false]);

        await reth.connect(user2).deposit({value:ethers.utils.parseEther(deposit)})
        await ceth.connect(user3).mint({value:ethers.utils.parseEther(deposit)})

        await network.provider.send("evm_setAutomine", [true]);
  
        await mineBlocks(blocksToMine)

        await network.provider.send("evm_setAutomine", [false]);

        withdraw = await reth.connect(user2).withdraw(await reth.balanceOf(user2.address))

        compBal = await ceth.balanceOf(user3.address)

        withdraw2 = await ceth.connect(user3).redeem(compBal)

        await network.provider.send("evm_mine")
        await network.provider.send("evm_setAutomine", [true]);

        withdraw = await withdraw.wait();
        receipt = await withdraw2.wait()

        receipt = await getPastEventsFromReceipt(receipt, "Redeem")

        redeemAmount = receipt.redeemAmount

        redeem = (redeemAmount-(deposit*1e18)).toString()
 
        receiptEvent = await getPastEventsFromReceipt(withdraw, 'withdrawn')
        Amount = (receiptEvent.amount - (deposit*1e18))
  
        // console.log({Amount});
        // console.log({redeem});
  
        expect(parseInt(Amount)).to.equal(parseInt(redeem))  // -- ideally
  
      }).timeout('40s')

      it("#3 A user should not be able to deposit more than the maxUserSupplyinEth", async () => {

        await resetFork()

        deposit = "101"
        
        await truffleAssert.reverts(
          reth.connect(user2).deposit({value:ethers.utils.parseEther(deposit)}),
          truffleAssert.ErrorType.REVERT,
          "LIM00"
        );
  
      }).timeout('40s')

      it("#4 The protocol should not be able to receive more than the maxVaultSupplyinEth in collateral", async () => {
  
        await reth.connect(user2).deposit({value:ethers.utils.parseEther('100')})
  
        await reth.connect(user3).deposit({value:ethers.utils.parseEther('100')})
  
        await truffleAssert.reverts(
          reth.connect(deploySigner).deposit({value:ethers.utils.parseEther('100')}),
          truffleAssert.ErrorType.REVERT,
          "LIM01"
        );
      }).timeout('40s')

      it("#5 A user should receive rewards from the harvest", async () => {
        await resetFork();

        deposit = "100"
        blocksToMine = 100//6570 //((60*60*24)/13.15)
        await reth.connect(user7).deposit({ value: ethers.utils.parseEther('0.1') })
        await reth.connect(user2).deposit({ value: ethers.utils.parseEther(deposit) })
        await reth.connect(deploySigner).rebalance()
        await mineBlocks(blocksToMine)
        await earnHarvestRewards()
        await reth.connect(deploySigner).harvest()
        await earnHarvestRewards()
        await mineBlocks(blocksToMine)
        await reth.connect(deploySigner).harvest()
        bal = await reth.balanceOf(user2.address);
        await reth.connect(user2).withdraw(bal)

        compBalBefore = await compContract.balanceOf(reth.address);
        farmBalBefore = await farmContract.balanceOf(reth.address);

        await reth.connect(user2).claimRewards() 

        compBalAfter = await compContract.balanceOf(reth.address);
        farmBalAfter = await farmContract.balanceOf(reth.address);

        expect(parseInt(compBalAfter)).to.be.greaterThan(parseInt(compBalBefore));
        expect(parseInt(farmBalAfter)).to.be.greaterThan(parseInt(farmBalBefore));

      }).timeout('300s')

      it("#6 A user should pay interest on what they borrow", async() => {

        await resetFork()
        deposit = "100"
        blocksToMine = 1000//6570 //((60*60*24)/13.15)
        
        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100)) // Borrowing 
        
        await reth.connect(user2).takeLoan(borrowed, {value:ethers.utils.parseEther(deposit)})
  
        await mineBlocks(blocksToMine)

        _borrowRatePerBlock = await cdai.borrowRatePerBlock();
        ethMantissa = 1e18
      
        interestByBlock = ((_borrowRatePerBlock*(borrowed))/ethMantissa)*(blocksToMine+3)
                                
        interest = web3.utils.toBN(borrowed).add(web3.utils.toBN(interestByBlock))
                    
        await reth.connect(user2).borrowBalanceCurrent(user2.address);
        balance = await reth.borrowBalanceStored(user2.address)
        interest = web3.utils.toBN(borrowed).add(web3.utils.toBN(interestByBlock))
        
        await dai.connect(user2).approve(reth.address, (balance*1000).toPrecision(27))

        repayReceipt = await reth.connect(user2).repayAll(user2.address);
        repayReceipt = await repayReceipt.wait();
        
        receiptEvent = await getPastEventsFromReceipt(repayReceipt, 'Transfer')
        // console.log({receiptEvent:receiptEvent.value.toString(), interestByBlock, interest:interest.toString()});
        tolerance = ((receiptEvent.value.toString()-interest)/ethMantissa)*100

        expect(parseInt(toleranceBlock)).to.be.lessThan(0.001)
        expect(parseInt(receiptEvent.value)).to.be.greaterThan(parseInt(borrowed))

      }).timeout('300s')

      it("#7 A user should pay the same amount of interest on what they borrow as Compound", async() => {

        deposit = "100"
        blocksToMine = 100//6570 //((60*60*24)/13.15)

        await compCont.connect(user2).enterMarkets([cdaiaddress, cethaddress])
        await compCont.connect(deploySigner).enterMarkets([cdaiaddress, cethaddress])
        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100)) // Borrowing 

        await network.provider.send("evm_setAutomine", [false]);

        await ceth.connect(user2).mint({value:ethers.utils.parseEther(deposit)})
        await cdai.connect(user2).borrow(borrowed)

        await ceth.connect(deploySigner).mint({value:ethers.utils.parseEther(deposit)})
        await cdai.connect(deploySigner).borrow(borrowed)

        await network.provider.send("evm_mine")
        await network.provider.send("evm_setAutomine", [true]);
  
        await mineBlocks(blocksToMine)

        bal = web3.utils.toBN((2**256).toPrecision(78)).sub(web3.utils.toBN(1)).toString()

        await dai.connect(user2).approve(cdaiaddress, bal)
        await dai.connect(deploySigner).approve(cdaiaddress, bal)

        await network.provider.send("evm_setAutomine", [false]);
        
        repayUser2 = await cdai.connect(user2).repayBorrow(bal)

        repayDeployer = await cdai.connect(deploySigner).repayBorrow(bal)

        await network.provider.send("evm_mine")
        await network.provider.send("evm_setAutomine", [true]);

        repayUser2 = await repayUser2.wait()
        repayDeployer = await repayDeployer.wait()

        receiptUser2 = await getPastEventsFromReceipt(repayUser2, 'RepayBorrow')
        repayAmountUser2 = receiptUser2.repayAmount.toString()

        receiptDeployer = await getPastEventsFromReceipt(repayDeployer, 'RepayBorrow')
        repayAmountDeployer = receiptDeployer.repayAmount.toString()

        expect(parseInt(repayAmountUser2)).to.be.equal(parseInt(repayAmountDeployer))  //ideally
      }).timeout('200s')

      it("#7.1 A user should pay the same amount of interest as Compound on what they borrow", async() => {

        await resetFork();
        deposit = "100"
        blocksToMine = 100//6570 //((60*60*24)/13.15)

        await compCont.connect(deploySigner).enterMarkets([cdaiaddress, cethaddress])
        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100)) // Borrowing 

        await network.provider.send("evm_setAutomine", [false]);

        await reth.connect(user2).takeLoan(borrowed, {value:ethers.utils.parseEther(deposit)})

        await ceth.connect(deploySigner).mint({value:ethers.utils.parseEther(deposit)})
        await cdai.connect(deploySigner).borrow(borrowed)

        await network.provider.send("evm_mine")
        await network.provider.send("evm_setAutomine", [true]);
  
        await mineBlocks(blocksToMine)

        bal = web3.utils.toBN((2**256).toPrecision(78)).sub(web3.utils.toBN(1)).toString()

        await dai.connect(user2).approve(reth.address, bal)
        await dai.connect(deploySigner).approve(cdaiaddress, bal)

        await network.provider.send("evm_setAutomine", [false]);
        
        repayUser2 = await reth.connect(user2).repayAll(user2.address)

        repayDeployer = await cdai.connect(deploySigner).repayBorrow(bal)

        await network.provider.send("evm_mine")
        await network.provider.send("evm_setAutomine", [true]);

        repayUser2 = await repayUser2.wait()
        repayDeployer = await repayDeployer.wait()

        receiptUser2 = await getPastEventsFromReceipt(repayUser2, 'repaid')
        repayAmountUser2 = receiptUser2.amountPaid.toString()

        receiptDeployer = await getPastEventsFromReceipt(repayDeployer, 'RepayBorrow')
        repayAmountDeployer = receiptDeployer.repayAmount.toString()

        // console.log({repayAmountUser2, repayAmountDeployer});
        expect(parseInt(repayAmountUser2)).to.be.equal(parseInt(repayAmountDeployer))  //ideally
      }).timeout('200s')

      it("#8 A user should not be able to borrow more than allowed", async() => {

        deposit = "100"

        borrowed = borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(61).div(100))
  
        await truffleAssert.reverts(
          reth.connect(user2).takeLoan(borrowed, {value:ethers.utils.parseEther(deposit)}),
          truffleAssert.ErrorType.REVERT,
          "not Sufficient Balance"
        );
      }).timeout('400s')

      it("#9 A user should be able to borrow more than target LTV", async() => {
  
        await resetFork();

        deposit = "100"

        borrowed = borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(59).div(100))
  
        await truffleAssert.passes(
          reth.connect(user2).takeLoan(borrowed, {value:ethers.utils.parseEther(deposit)}),
          '59% loan borrowed'
        );
      }).timeout('400s')

      it("#10 An user should be rewarded in the harvest",async()=>{
      
        await resetFork()
        deposit='100'
        blocksToMine = 100 //(365*24*60*60)/(13.15)
  
        await reth.connect(user7).deposit({ value: ethers.utils.parseEther('0.1')})
        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100))
  
        await reth.connect(user2).takeLoan(borrowed, {value:ethers.utils.parseEther(deposit)})
  
        await reth.connect(user3).rebalance()
  
        await mineBlocks(blocksToMine)
  
        await earnHarvestRewards()
  
        await reth.connect(user3).harvest();
  
        await mineBlocks(100)
  
        await earnHarvestRewards()

        previousDaiBalance = await dai.balanceOf(reth.address);
  
        await reth.connect(user3).harvest();

        newDaiBalance = await dai.balanceOf(reth.address);
  
        harvest = await reth.harvestData(1)
        yieldAmt = await harvest.yieldAmt;
  
        _supplyRatePerBlock = await ceth.supplyRatePerBlock();
        _borrowRatePerBlock = await cdai.borrowRatePerBlock();
        ethMantissa = 1e18
  
        rewardByBlock = ((_supplyRatePerBlock*(deposit*1e18))/ethMantissa)*(blocksToMine+100+8)
        interestByBlock = ((_borrowRatePerBlock*(borrowed))/ethMantissa)*(blocksToMine+100+7)
  
        amountToRepay = web3.utils.toBN(borrowed).add(web3.utils.toBN(interestByBlock))
  
        await dai.connect(user2).approve(reth.address, (amountToRepay+10))
        
        tx1 = await reth.connect(user2).repayAll(user2.address);
        tx1 = await tx1.wait();
        tx2 = await reth.connect(user2).withdraw((await reth.balanceOf(user2.address)))
        tx2 = await tx2.wait();
  
        repay = await getPastEventsFromReceipt(tx1, "Transfer")
        reward = await getPastEventsFromReceipt(tx2, "withdrawn")
  
        newDaiBalance = await dai.balanceOf(user2.address);
  
        // console.log({rewardByBlock, reward:reward.amount.toString(), amountToRepay:amountToRepay.toString(), repay:repay.value.toString()});
  
        APY = await axios.get(`https://wissg5tmbg.eu-west-1.awsapprunner.com/api/info/getYeildApy`);
        harvestAPY = await APY.data.data.yeildApy
        
        store = await evaluator.store();
        
        blockInYear = (365*24*60*60)/13.15
  
        // DAI: (- toDAI(40 ETH) * "Compound Borrow APY") + (( toDai(100 ETH) * Target.LTV - toDAI(40 ETH) ) * "Harvest Auto-Harvested APY" * (1 - yieldReserveFactor))
        temp = (((((await ethToDai(ethers.utils.parseEther(deposit)))/ethMantissa)*store.tLTV)) - ((ethers.utils.parseEther('40'))))/blockInYear
        refiBalances = (temp*(harvestAPY/100))*(1-(store.reserveFactor/1e18))*100
        daiBalance = (-interestByBlock + refiBalances)
        // console.log({refiBalances, daiBalance, yieldAmt:yieldAmt.toString()});

        expect(parseInt(previousDaiBalance)).to.be.lessThan(parseInt(newDaiBalance))
        expect(parseInt(yieldAmt)).to.be.greaterThan(0)
  
      }).timeout('400s')

      it("#11 To avoid harvest hopping a user, when withdrawing, should not receive a reward for their last harvest",async()=>{

        await resetFork()
        deposit='100'
        blocksToMine = 100 //(365*24*60*60)/(13.15)

        await reth.connect(user7).deposit({ value: ethers.utils.parseEther('0.1')})
        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100))
        await reth.connect(user2).takeLoan(borrowed,{value:ethers.utils.parseEther(deposit)})

        await reth.connect(user3).rebalance()

        await mineBlocks(blocksToMine)

        await earnHarvestRewards()

        await reth.connect(user3).harvest();

        harvest = await reth.harvestData(0)
        yieldAmt = await harvest.yieldAmt;
    
        _supplyRatePerBlock = await ceth.supplyRatePerBlock();
        _borrowRatePerBlock = await cdai.borrowRatePerBlock();
        ethMantissa = 1e18

        rewardByBlock = ((_supplyRatePerBlock*(deposit*1e18))/ethMantissa)*(blocksToMine+6)
        interestByBlock = ((_borrowRatePerBlock*(borrowed))/ethMantissa)*(blocksToMine+5)

        amountToRepay = web3.utils.toBN(borrowed).add(web3.utils.toBN(interestByBlock))

        await dai.connect(user2).approve(reth.address, (amountToRepay+10))

        tx1 = await reth.connect(user2).repayAll(user2.address);
        tx1 = await tx1.wait();

        prevBal = await dai.balanceOf(user2.address)

        tx2 = await reth.connect(user2).withdraw((await reth.balanceOf(user2.address)))
        tx2 = await tx2.wait();

        newBal = await dai.balanceOf(user2.address)
  
        repay = await getPastEventsFromReceipt(tx1, "Transfer")
        reward = await getPastEventsFromReceipt(tx2, "withdrawn")
    
        // console.log({rewardByBlock, reward:reward.amount.toString(), amountToRepay:amountToRepay.toString(), repay:repay.value.toString()});

        // fDAI: ( toDai(100 ETH) * Target.LTV - toDAI(40 ETH) ) * "Harvest Auto-Harvested APY" * (1 - yieldReserveFactor)

        APY = await axios.get(`https://wissg5tmbg.eu-west-1.awsapprunner.com/api/info/getYeildApy`);
        harvestAPY = await APY.data.data.yeildApy

        store = await evaluator.store();

        blockInYear = (365*24*60*60)/13.15

        temp = (((((await ethToDai(ethers.utils.parseEther(deposit)))/ethMantissa)*store.tLTV)) - ((ethers.utils.parseEther('40'))))/blockInYear
        refiBalances = (temp*(harvestAPY/100))*(1-(store.reserveFactor/1e18))*100
        
        // console.log({refiBalances, daiBalance, yieldAmt:yieldAmt.toString()});

        expect(parseInt(yieldAmt)).to.be.greaterThan(0)
        expect(parseInt(prevBal)).to.be.equal(parseInt(newBal))
    
      }).timeout('400s')

      it("#12 An overcollateralised user shouldn't be rewarded in the harvest",async()=>{
        
        await resetFork()
        deposit='100'
        blocksToMine = 100//(365*24*60*60)/(13.15)
  
        await reth.connect(user7).deposit({ value: ethers.utils.parseEther('0.1')})
        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(57).div(100))
  
        await reth.connect(user2).takeLoan(borrowed,{value:ethers.utils.parseEther(deposit)})
        _supplyRatePerBlock1 = await ceth.supplyRatePerBlock();
  
        await reth.connect(user3).deposit({value:ethers.utils.parseEther(deposit)})
  
        await reth.connect(deploySigner).rebalance();
  
        await mineBlocks(blocksToMine);
  
        await earnHarvestRewards()
  
        await reth.connect(deploySigner).harvest();
        await mineBlocks(100)
  
        await earnHarvestRewards()
        await reth.connect(deploySigner).harvest();
  
        await mineBlocks(1);
    
        _supplyRatePerBlock2 = await ceth.supplyRatePerBlock();
        _borrowRatePerBlock = await cdai.borrowRatePerBlock();
        ethMantissa = 1e18
  
        interestByBlock = ((_borrowRatePerBlock*(borrowed))/ethMantissa)*((blocksToMine*2)+9)
        amountToRepay = web3.utils.toBN(borrowed).add(web3.utils.toBN(interestByBlock))

        index = await reth.harvestIndex();
        await reth.commitUsers([user2.address], index)

        userData = await reth.userData(user2.address)

        expect(parseInt(userData[1])).to.be.equal(0)
        expect(parseInt(userData[2])).to.be.equal(0)
  
        await dai.connect(user2).approve(reth.address, (amountToRepay+10))
  
        tx1 = await reth.connect(user2).repayAll(user2.address); 
        tx1 = await tx1.wait();
        tx2 = await reth.connect(user2).withdraw((await reth.balanceOf(user2.address)))
        tx2 = await tx2.wait();
        _supplyRatePerBlock3 = await ceth.supplyRatePerBlock();
        
        tx3 = await reth.connect(user3).withdraw((await reth.balanceOf(user3.address)))
        tx3 = await tx3.wait();
        
        rewardByBlockUser2 = (((_supplyRatePerBlock2*(deposit*1e18))/ethMantissa)*((blocksToMine*2)+10))+_supplyRatePerBlock1
        rewardByBlockUser3 = (((_supplyRatePerBlock2*(deposit*1e18))/ethMantissa)*((blocksToMine*2)+10))+_supplyRatePerBlock3
  
        repay = await getPastEventsFromReceipt(tx1, "Transfer")
        reward1 = await getPastEventsFromReceipt(tx2, "withdrawn")
        reward2 = await getPastEventsFromReceipt(tx2, "withdrawn")

        await reth.connect(user3).claimRewards() 
  
        APY = await axios.get(`https://wissg5tmbg.eu-west-1.awsapprunner.com/api/info/getYeildApy`);
        store = await evaluator.store();
        // calRe=(await ethToDai(200*store.tLTV -57))*APY.data.yieldApy*(1-store.reserveFactor/1e18);
  
        // calRe1=(await ethToDai(200*store.tLTV -57))*APY.data.yieldApy*(store.reserveFactor/1e18)

        // expect(parseInt(compBalAfter)).to.be.greaterThan(parseInt(compBalBefore));
        // expect(parseInt(farmBalAfter)).to.be.greaterThan(parseInt(farmBalBefore));

      }).timeout('100s')

      it("#13 A user should be able to repay their loan partially", async() => {

        await resetFork();

        deposit = "100"

        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100)) // Borrowing 
        
        await reth.connect(user2).takeLoan(borrowed, {value:ethers.utils.parseEther(deposit)})

        blocksToMine = 100//((60*60*24)/13.5)*7 // blocks mined in a week
      
        await mineBlocks(blocksToMine)
            
        _supplyRatePerBlock = await ceth.supplyRatePerBlock();
        _borrowRatePerBlock = await cdai.borrowRatePerBlock();
        ethMantissa = 1e18
          
        rewardByBlock = ((_supplyRatePerBlock*(deposit*1e18))/ethMantissa)*(blocksToMine+2)
        interestByBlockFor40Eth = ((_borrowRatePerBlock*(borrowed))/ethMantissa)*(blocksToMine+2)
        
        amountToRepay = (borrowed/2).toPrecision(23)

        await dai.connect(user2).approve(reth.address, amountToRepay)

        repay = await reth.connect(user2).repay(user2.address, amountToRepay)
        receipt = await repay.wait();

        borrowBalance = await web3.utils.toBN(amountToRepay).add(await web3.utils.toBN(interestByBlockFor40Eth))

        _borrowRatePerBlock = await cdai.borrowRatePerBlock();
        interestByBlockFor20Eth = (((_borrowRatePerBlock*(borrowBalance))/ethMantissa)*2).toFixed()
      
        receiptEvent = await getPastEventsFromReceipt(receipt, 'Transfer')
        // console.log({receiptEvent:receiptEvent.value.toString()});
      
        await reth.connect(user3).borrowBalanceCurrent(user2.address)
      
        balance = await reth.borrowBalanceStored(user2.address)
        // console.log({Borrows:balance.toString()});

        borrowBalance = borrowBalance.add(web3.utils.toBN(interestByBlockFor20Eth))
        // console.log({balance:borrowBalance.toString()});

        // expect(balance.toString()).to.be.equal(borrowBalance.toString())
        // console.log({diff:(Number(amountToRepay) + Number(balance[0])-(Number(borrowed) + interestByBlock))});

        expect(parseInt(balance)).to.be.within(parseInt(amountToRepay), parseInt(borrowed))

      }).timeout('400s')

      it("#14 A user should be able to withdraw their collateral partially",async()=>{

        await resetFork();
        deposit='100'
        blocksToMine = 100 //(365*24*60*60)/(13.15)

        borrowed = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100)) // Borrowing

        await reth.connect(user2).takeLoan(borrowed,{value:ethers.utils.parseEther(deposit)})

        await mineBlocks(blocksToMine)
    
        _supplyRatePerBlock = await ceth.supplyRatePerBlock();
        _borrowRatePerBlock = await cdai.borrowRatePerBlock();
        ethMantissa = 1e18

        rewardByBlock = ((_supplyRatePerBlock*(deposit*1e18))/ethMantissa)*(blocksToMine+2)
    
        interestByBlock = ((_borrowRatePerBlock*borrowed)/ethMantissa)*(blocksToMine+2)

        rethToken = await reth.balanceOf(user2.address);

        amountToWithdraw = (rethToken/10).toFixed()

        await reth.connect(user2).withdraw(amountToWithdraw);  

        // expect(daiBalance).to.equal(daiBalance-amountToWithdraw+rewardByBlock)

        // expect(daiBalance).to.equal(previousDaiBalance+interestByBlock);

        expect(rethToken).to.be.within(amountToWithdraw, rethToken)

      }).timeout('40s')

      it("#15 A user who's loan is fully paid back should receive harvest rewards in DAI", async() => {
 
        await resetFork()
        deposit = "100";

        borrowed = await ethToDai(ethers.utils.parseEther(deposit).div(1000)) // Borrowing 
        
        blocksToMine = 100 //(24*60*60)/13.15
        await reth.connect(user7).deposit({value: ethers.utils.parseEther('0.1')})

        await reth.connect(user2).takeLoan(borrowed, {value: ethers.utils.parseEther(deposit)})

        await reth.connect(user2).rebalance()

        await mineBlocks(blocksToMine)
        await earnHarvestRewards();

        await reth.connect(user2).harvest();
      
        await mineBlocks(blocksToMine)
        await earnHarvestRewards();

        await reth.connect(user2).harvest();

        await mineBlocks(1)

        await dai.connect(user2).approve(reth.address, "99999999999999999999999999999999999999999")
        await reth.connect(user2).repayAll(user2.address);

        await reth.connect(user2).rebalance()

        await mineBlocks(blocksToMine)
        await earnHarvestRewards();

        await reth.connect(user2).harvest();

        await mineBlocks(blocksToMine)
        await earnHarvestRewards();

        await reth.connect(user2).harvest();

        await reth.connect(user2).withdraw(await reth.balanceOf(user2.address));

        balBefore = await dai.balanceOf(user2.address)

        // console.log(await reth.userData(user2.address));
        await reth.connect(user2).claimUser() 


        balAfter = await dai.balanceOf(user2.address)

        expect(parseInt(balBefore)).to.be.lessThan(parseInt(balAfter))
        
      }).timeout(('100s')) 

      it("#16 A user should be liquidated if they go over the collateral factor", async () => {

        await resetFork();
        
        deposit = "100"
        blocksToMine = 1000//6570 //((60*60*24)/13.15)
        amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(59).div(100))

        await reth.connect(user7).deposit({value: ethers.utils.parseEther('0.1')})
        await reth.connect(user2).takeLoan(amtLoan, {value: ethers.utils.parseEther(deposit)})

        balanceBefore = await reth.balanceOf(user2.address)

        await reth.connect(deploySigner).rebalance()

        await mineBlocks(blocksToMine)

        newCollateralFactor = '500000000000000000' //0.5

        closeFactor = await controller.closeFactorMantissa()
        liquidateAmount = (amtLoan*(closeFactor/1e18)).toPrecision(24)

        await controller.connect(deploySigner).setCollateralFactorRefi(newCollateralFactor)

        await dai.connect(deploySigner).approve(reth.address, liquidateAmount)

        rec = await reth.connect(deploySigner).liquidateBorrow(deploySigner.address, user2.address, liquidateAmount)
        rec = await rec.wait()
        
        amountToWithdraw = await reth.balanceOf(user2.address)

        await dai.connect(user2).approve(reth.address, liquidateAmount)

        await reth.connect(user2).repayAll(user2.address)
        await reth.connect(user2).withdraw(await reth.balanceOf(user2.address));

        expect(parseInt(balanceBefore)).to.be.greaterThan(parseInt(amountToWithdraw))
      }).timeout('100s')

      it("#17 A user should not be liquidated if they have uncommitted yields available #BLOCKED", async() => {
        
        await resetFork()
        newValue = '75000000000000000' //0.75 => 75%
        store = await evaluator.store();

        await evaluator.connect(deploySigner).setConfig(newValue, newValue, newValue, store.min_depo, store.reserveFactor);
        amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(75).div(100))

        deposit = '100'
        blocksToMine = 100 //(24*60*60)/13.15
        await reth.connect(user7).deposit({value: ethers.utils.parseEther('0.1')})
        await reth.connect(user2).deposit({value: ethers.utils.parseEther(deposit)})

        await reth.connect(deploySigner).rebalance()

        await mineBlocks(blocksToMine)
        await earnHarvestRewards();

        await reth.connect(deploySigner).harvest();

        await reth.connect(user2).borrow(amtLoan)
  
        await reth.connect(deploySigner).rebalance()

        await mineBlocks(blocksToMine)

        closeFactor = await controller.closeFactorMantissa()
        liquidateAmount = (amtLoan*closeFactor).toPrecision(24)

        await dai.connect(deploySigner).approve(reth.address, liquidateAmount)

        await reth.connect(deploySigner).liquidateBorrow(deploySigner.address, user2.address, liquidateAmount)
      }).timeout('40s')

      it("#18 A user should not be liquidated if they have uncommitted yields available #BLOCKED", async() => {
        
        await resetFork();
        
        newValue = '75000000000000000' //0.75 => 75%
        store = await evaluator.store();

        await evaluator.connect(deploySigner).setConfig(newValue, newValue, newValue, store.min_depo, 0);
        amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(75).div(100))

        deposit = '100'
        blocksToMine = 100 //(24*60*60)/13.15
        await reth.connect(user7).deposit({value: ethers.utils.parseEther('0.1')})
        await reth.connect(user2).deposit({value: ethers.utils.parseEther(deposit)})

        await mineBlocks(blocksToMine)
        await earnHarvestRewards();

        await reth.connect(deploySigner).harvest();

        await reth.connect(user2).borrow(amtLoan)
  
        await reth.connect(deploySigner).rebalance()

        await mineBlocks(blocksToMine)

        closeFactor = await controller.closeFactorMantissa()
        liquidateAmount = (amtLoan*closeFactor).toPrecision(24)

        await dai.connect(deploySigner).approve(reth.address, liquidateAmount)

        await reth.connect(deploySigner).liquidateBorrow(deploySigner.address, user2.address, liquidateAmount)
      }).timeout('40s')

      it("#46 All accounting should be correct after a complex set of user interactions", async() => {
      
        await resetFork()

        await reth.connect(user7).deposit({value: ethers.utils.parseEther('0.1')})
        extraBal = await reth.balanceOf(user7.address)

        await dai.connect(user2).transfer(user3.address, ethers.utils.parseEther("50000"))
        await dai.connect(deploySigner).transfer(user4.address, ethers.utils.parseEther("50000"))

        deposit = '50'
        amtLoan = await ethToDai(ethers.utils.parseEther(deposit).mul(20).div(100))
        await reth.connect(user2).takeLoan(amtLoan, { value: ethers.utils.parseEther(deposit) })

        await mineBlocks(10)

        await dai.connect(user2).approve(reth.address, '999999999999999999999999999999999')
        await dai.connect(deploySigner).approve(reth.address, '999999999999999999999999999999999')
        await dai.connect(user3).approve(reth.address, '999999999999999999999999999999999')
        await dai.connect(user4).approve(reth.address, '999999999999999999999999999999999')

        await reth.connect(user2).repayAll(user2.address);

        await reth.connect(user2).withdraw(await reth.balanceOf(user2.address))

        deposit = '50'
        amtLoan = await ethToDai(ethers.utils.parseEther(deposit).mul(20).div(100))
        await reth.connect(user2).takeLoan(amtLoan, { value: ethers.utils.parseEther(deposit) })

        deposit = '60'
        amtLoan = await ethToDai(ethers.utils.parseEther(deposit).mul(50).div(100))
        await reth.connect(deploySigner).takeLoan(amtLoan, { value: ethers.utils.parseEther(deposit) })

        await mineBlocks(10)

        await reth.connect(deploySigner).harvest()

        await mineBlocks(100)

        await reth.connect(deploySigner).harvest()

        deposit = '75'
        amtLoan = await ethToDai(ethers.utils.parseEther(deposit).mul(40).div(100))
        await reth.connect(user3).takeLoan(amtLoan, { value: ethers.utils.parseEther(deposit) })

        await mineBlocks(100)

        await reth.connect(deploySigner).harvest()

        deposit = '50'
        amtLoan = await ethToDai(ethers.utils.parseEther(deposit).mul(20).div(100))
        await reth.connect(user4).takeLoan(amtLoan, { value: ethers.utils.parseEther(deposit) })

        await mineBlocks(100)

        await reth.connect(deploySigner).harvest()

        await mineBlocks(10)

        await reth.connect(deploySigner).repayAll(deploySigner.address);
        await reth.connect(deploySigner).withdraw((await reth.balanceOf(deploySigner.address)))

        await reth.connect(user2).repayAll(user2.address);
        await reth.connect(user2).withdraw((await reth.balanceOf(user2.address)))

        await reth.connect(user3).repayAll(user3.address);
        await reth.connect(user3).withdraw((await reth.balanceOf(user3.address)))

        await reth.connect(user4).repayAll(user4.address);
        await reth.connect(user4).withdraw((await reth.balanceOf(user4.address)))

        totalSupply = await reth.totalSupply()
        cEthBal = await ceth.balanceOf(reth.address)
        cDaiBal = await cdai.balanceOf(reth.address)

        expect(parseInt(totalSupply-extraBal)).to.be.equal(0)
        expect(parseInt(cEthBal-extraBal)).to.be.equal(0)
        expect(parseInt(cDaiBal)).to.be.equal(0)
      }).timeout('100s')
    })
  }

  await testCasesreth();
}
























async function stabilityUserCheck() {
  async function stabilityTestCases() {
    describe("Stability Test cases", async function () {
      // it("#19 A stability user should receive interest on their collateral", async () => {

      //   deposit = "100"
      //   await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })



      //   // Withdraw
      //   blocksToMine = (400) / (13.15)
      //   let block = await web3.eth.getBlock('latest')
      //   let time = block.timestamp
      //   const amount = rseth.balanceOf(user4.address);
      //   await rseth.connect(user4).requestRelease(amount)
      //   await mineBlocks(blocksToMine);
      //   _supplyRatePerBlock = await ceth.supplyRatePerBlock();
      //   block = await web3.eth.getBlock('latest')
      //   time = block.timestamp - time;
      //   expect(time).to.greaterThan(180)
      //   expect(time).to.lessThan(500)
      //   try {
      //     const tx = await rseth.connect(user4).withdraw(user4.address, amount)
      //     const res = await getPastEventsFromReceipt(await tx.wait(), 'withdrawn')
      //     amountwith = res.amountWithdrawn
      //   } catch (err) {
      //     assert.fail(0, 1, err)
      //   }

      //   Amount = (amountwith - (deposit * 1e18))

      //   ethMantissa = 1e18;

      //   rewardByBlock = ((_supplyRatePerBlock * (deposit * 1e18)) / ethMantissa) * (blocksToMine + 3)

      //   console.log({ Amount, rewardByBlock });

      //   console.log({ toleranceBlock: (((rewardByBlock - Amount) / rewardByBlock) * 100) });


      // }).timeout('40s')
      // it(" #21 A stability user should not be able to deposit more than the maxUserSupplyinEth", async () => {
      //   deposit = '150'
      //   try {
      //     await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
      //   } catch (err) {
      //     assert.fail(0, 1, err)
      //   }
      //   try {
      //     await rseth.connect(user5).stake({ value: ethers.utils.parseEther(deposit) })
      //     assert.fail(0, 1, 'Deposit Limit exceeded still can deposit')
      //   } catch (err) {
      //   }

      // })

      // it(" #22 A stability user should not be able to withdraw their collateral outside the withdrawal period", async () => {
      //   //Already deposited in first step 
      //   blocksToMine = (60) / (13.15)
      //   let block = await web3.eth.getBlock('latest')
      //   let time = block.timestamp
      //   const amount = rseth.balanceOf(user4.address);
      //   await rseth.connect(user4).requestRelease(amount)
      //   await mineBlocks(blocksToMine);
      //   block = await web3.eth.getBlock('latest')
      //   time = block.timestamp - time;
      //   expect(time).to.greaterThan(60)
      //   expect(time).to.lessThan(180)
      //   try {
      //     await rseth.connect(user4).withdraw(user4.address, amount)
      //     assert.fail(0, 1, 'Withdrawn before cooldown over')
      //   } catch (err) { }
      // })

      // it(" #23 A stability user should be able to withdraw part of their collateral during the withdrawal period", async () => {
      //   //Already deposited in first step 
      //   blocksToMine = (180) / (13.15)
      //   let block = await web3.eth.getBlock('latest')
      //   let time = block.timestamp
      //   const amount = rseth.balanceOf(user4.address);
      //   await rseth.connect(user4).requestRelease(amount)
      //   await mineBlocks(blocksToMine);
      //   block = await web3.eth.getBlock('latest')
      //   time = block.timestamp - time;
      //   expect(time).to.greaterThan(180)
      //   expect(time).to.lessThan(500)
      //   try {
      //     const tx = await rseth.connect(user4).withdraw(user4.address, amount)
      //     const res = await getPastEventsFromReceipt(await tx.wait(), 'withdrawn')
      //     expect(BigNumber.from(res.amountWithdrawn)).to.be.within(BigNumber.from(ethers.utils.parseEther(deposit)), BigNumber.from(ethers.utils.parseEther(deposit + 0.01 * deposit)))
      //   } catch (err) {
      //     assert.fail(0, 1, err)
      //   }
      // })
      // it(" #24 A stability user should not be able to withdraw more than the released collateral inside the withdrawal period", async () => {
      //   deposit = '150'
      //   withdrawReq = '100'
      //   withdraw = '101'
      //   try {
      //     await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
      //   } catch (err) {
      //     assert.fail(0, 1, err)
      //   }
      //   blocksToMine = (180) / (13.15)
      //   let block = await web3.eth.getBlock('latest')
      //   let time = block.timestamp
      //   await ceth.connect(deploySigner).exchangeRateCurrent()
      //   let exchangeRate = await ceth.exchangeRateStored()
      //   const amount = BigNumber.from(ethers.utils.parseEther(withdrawReq)).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate)
      //   await rseth.connect(user4).requestRelease(amount)
      //   await mineBlocks(blocksToMine);
      //   block = await web3.eth.getBlock('latest')
      //   time = block.timestamp - time;
      //   expect(time).to.greaterThan(180)
      //   expect(time).to.lessThan(500)
      //   await ceth.connect(deploySigner).exchangeRateCurrent()
      //   exchangeRate = await ceth.exchangeRateStored()
      //   try {
      //     const amountOut = ethers.utils.parseEther(withdraw).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate);
      //     expect(parseInt(amountOut)).to.greaterThan(parseInt(amount))
      //     const tx = await rseth.connect(user4).withdraw(user4.address, amountOut)
      //     assert.fail(0, 1, 'Withraw Success')
      //   } catch (err) {
      //     //success
      //     expect(err.toString()).to.include("You requested for lower amount")
      //     //reset user 4

      //     blocksToMine = (180) / (13.15)
      //     let block = await web3.eth.getBlock('latest')
      //     let time = block.timestamp
      //     const amount = rseth.balanceOf(user4.address);
      //     await rseth.connect(user4).requestRelease(amount)
      //     await mineBlocks(blocksToMine);
      //     block = await web3.eth.getBlock('latest')
      //     time = block.timestamp - time;
      //     expect(time).to.greaterThan(180)
      //     expect(time).to.lessThan(500)
      //     try {
      //       const tx = await rseth.connect(user4).withdraw(user4.address, amount)
      //     } catch (err) {
      //       assert.fail(0, 1, err)
      //     }
      //   }
      // })
      // it(" #25 A stability user should not be able to withdraw collateral after the withdrawPeriod period has ended", async () => {
      //   deposit = '150'
      //   withdrawReq = '100'
      //   withdraw = '100'
      //   try {
      //     await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
      //   } catch (err) {
      //     assert.fail(0, 1, err)
      //   }
      //   blocksToMine = (500) / (13.15)
      //   let block = await web3.eth.getBlock('latest')
      //   let time = block.timestamp
      //   await ceth.connect(deploySigner).exchangeRateCurrent()
      //   let exchangeRate = await ceth.exchangeRateStored()
      //   const amount = BigNumber.from(ethers.utils.parseEther(withdrawReq)).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate)
      //   await rseth.connect(user4).requestRelease(amount)
      //   await mineBlocks(blocksToMine);
      //   block = await web3.eth.getBlock('latest')
      //   time = block.timestamp - time;
      //   expect(time).to.greaterThan(500)
      //   await ceth.connect(deploySigner).exchangeRateCurrent()
      //   exchangeRate = await ceth.exchangeRateStored()
      //   try {
      //     const amountOut = ethers.utils.parseEther(withdraw).mul(BigNumber.from(ethers.utils.parseEther('1'))).div(exchangeRate);
      //     expect(parseInt(amountOut)).to.lessThan(parseInt(amount))
      //     const tx = await rseth.connect(user4).withdraw(user4.address, amountOut)
      //     assert.fail(0, 1, 'Withdraw successful even after claim period is over')
      //   } catch (err) {
      //     //success
      //     expect(err.toString()).to.include("'Claim Period Over'")
          
      //     //reset user 4

      //     blocksToMine = (180) / (13.15)
      //     let block = await web3.eth.getBlock('latest')
      //     let time = block.timestamp
      //     const amount = rseth.balanceOf(user4.address);
      //     await rseth.connect(user4).requestRelease(amount)
      //     await mineBlocks(blocksToMine);
      //     block = await web3.eth.getBlock('latest')
      //     time = block.timestamp - time;
      //     expect(time).to.greaterThan(180)
      //     expect(time).to.lessThan(500)
      //     try {
      //       const tx = await rseth.connect(user4).withdraw(user4.address, amount)
      //     } catch (err) {
      //       assert.fail(0, 1, err)
      //     }
      //   }
      // })
      // it(" #26 A stability user, when withdrawing, should be given access to all harvests (including the last harvest)", async () => {
      //   deposit = '100'
      //   blocksToMine = 60 * 60 / 13.15
      //   try {
      //     await rseth.connect(user4).stake({ value: ethers.utils.parseEther(deposit) })
      //     await reth.connect(user5).deposit({ value: ethers.utils.parseEther('1') })
      //   } catch (err) {
      //     assert.fail(0, 1, err)
      //   }
      //   await reth.connect(deploySigner).rebalance()

      //   await mineBlocks(blocksToMine);

      //   await earnHarvestRewards()

      //   await reth.connect(deploySigner).harvest()

      //   const userData = await reth.userData(rseth.address);
      //   //withdraw all
      //   blocksToMine = (180) / (13.15)
      //   let block = await web3.eth.getBlock('latest')
      //   let time = block.timestamp
      //   const amount = await rseth.balanceOf(user4.address);
      //   const a2 = await reth.balanceOf(rseth.address)
      //   expect(parseInt(a2)).to.greaterThan(parseInt(amount))
      //   await rseth.connect(user4).requestRelease(amount)
      //   await mineBlocks(blocksToMine);
      //   block = await web3.eth.getBlock('latest')
      //   time = block.timestamp - time;
      //   expect(time).to.greaterThan(180)
      //   expect(time).to.lessThan(500)
      //   try {
      //     const tx = await rseth.connect(user4).withdraw(user4.address, amount)
      //     const rx = await tx.wait()
      //     const returnValues = await getPastEventsFromReceipt(rx, 'withdrawn')
      //     const finalBalance = await reth.balanceOf(rseth.address)
      //     expect(parseInt(finalBalance)).to.equal(0)
      //   } catch (err) {
      //     assert.fail(0, 1, err)
      //   }
      // }).timeout('100s')








      it("check", async () => {
        await resetFork();
        await reth.connect(user2).takeLoan(ethers.utils.parseEther('10000'), {value:ethers.utils.parseEther('10')})
        let rethbalance = await reth.balanceOf(user2.address)
        console.log("1")
        console.log(rethbalance)
        let daiBalance1 = await dai.balanceOf(user2.address)
        console.log(daiBalance1)
        await reth.connect(deploySigner).rebalance()
        await dai.connect(user2).transfer(user3.address, ethers.utils.parseUnits("100", 18) ) 
        await dai.connect(user2).transfer(user4.address, ethers.utils.parseUnits("100", 18) ) 
        await dai.connect(user2).transfer(user5.address, ethers.utils.parseUnits("100", 18) ) 
        
        await reth.rebalance()
        await mineBlocks(50)
        console.log("2")
        await reth.connect(user3).takeLoan(ethers.utils.parseEther('10000'), {value:ethers.utils.parseEther('10')})
        await reth.connect(user4).takeLoan(ethers.utils.parseEther('10000'), {value:ethers.utils.parseEther('10')})
        await reth.connect(user5).takeLoan(ethers.utils.parseEther('10000'), {value:ethers.utils.parseEther('10')})
        console.log("3")
        await mineBlocks(50)
        await earnHarvestRewards()
        console.log("claim rewards1")
        await reth.connect(deploySigner).claimRewards();
        //rx = await tx.wait()
        //res = await getPastEventsFromReceipt(rx, 'claimedVault')
        await reth.connect(deploySigner).harvest()
        console.log("4")
        let rethBalance = await reth.balanceOf(user3.address)
        let daiBalance = await dai.balanceOf(user3.address)
        let withdrawAmount = rethBalance.div(100).mul(100)
        await dai.connect(user3).approve(reth.address, daiBalance)
        await reth.connect(user3).repayAll(user3.address);
        await reth.connect(user3).withdraw(withdrawAmount.toString())
        await reth.rebalance()
        await mineBlocks(50)
        console.log("5")
        await reth.rebalance()
        await mineBlocks(50)
        console.log("6")
        rethBalance = await reth.balanceOf(user4.address)
        daiBalance = await dai.balanceOf(user4.address)
        withdrawAmount = rethBalance.div(100).mul(100)
        await dai.connect(user4).approve(reth.address, daiBalance)
        await reth.connect(user4).repayAll(user4.address);
        await reth.connect(user4).withdraw(withdrawAmount.toString())
     
        let daiBalance2 = await dai.balanceOf(user5.address)
    console.log(daiBalance2)
        let borrowBalance = await reth.borrowBalanceStored(user5.address)
    console.log(borrowBalance)
        let repayAmount = web3.utils.toBN(borrowBalance).divn(100).muln(20)
    console.log(repayAmount)
        await dai.connect(user5).approve(reth.address, repayAmount.toString())
        await reth.connect(user5).repaywithdraw(repayAmount.toString(), "0")
        await reth.rebalance()
        await mineBlocks(50)
        await earnHarvestRewards()
        console.log("claim rewards2")
        await reth.connect(deploySigner).claimRewards();
        //rx = await tx.wait()
        //res = await getPastEventsFromReceipt(rx, 'claimedVault')
        await reth.connect(deploySigner).harvest()
        console.log("7")
        await reth.rebalance()
        await mineBlocks(100)
        await earnHarvestRewards()
        console.log("claim rewards3")
        await reth.connect(deploySigner).claimRewards();
        //rx = await tx.wait()
        //res = await getPastEventsFromReceipt(rx, 'claimedVault')
        await reth.connect(deploySigner).harvest()
        console.log("8")
        await reth.rebalance()
        await mineBlocks(50)
        await earnHarvestRewards()
        console.log("claim rewards4")
        await reth.connect(deploySigner).claimRewards();
        //rx = await tx.wait()
        //res = await getPastEventsFromReceipt(rx, 'claimedVault')
        await reth.connect(deploySigner).harvest()
        console.log("9")
        borrowBalance = await reth.borrowBalanceStored(user5.address)
        repayAmount = web3.utils.toBN(borrowBalance).divn(100).muln(90)
        withdrawAmount = rethBalance.div(100).mul(90)
        await dai.connect(user5).approve(reth.address, repayAmount.toString())
        await reth.connect(user5).repaywithdraw(repayAmount.toString(), withdrawAmount.toString())
        await reth.rebalance()
        await mineBlocks(50)
        await earnHarvestRewards()
        await reth.connect(deploySigner).claimRewards();
        console.log("claim rewards5")
        //rx = await tx.wait()
        //res = await getPastEventsFromReceipt(rx, 'claimedVault')
        await reth.connect(deploySigner).harvest()
        console.log("10")
        }).timeout('900s')
    })
  }
  await stabilityTestCases();
}












































async function commitingUserCases() {
  describe("User Commit cases", async function () {
    it("#28 A committer can commit a single user", async () => {
      //1 Take Loan
      const amtLoan = await ethToDai(ethers.utils.parseEther('10').mul(40).div(100))
      await reth.connect(user6).takeLoan(amtLoan, { value: ethers.utils.parseEther('10') })
      await reth.connect(user7).takeLoan(amtLoan, { value: ethers.utils.parseEther('10') })
      await reth.connect(user2).takeLoan(amtLoan, { value: ethers.utils.parseEther('10') })
      //2 rebalance
      await reth.connect(deploySigner).rebalance()
      //3 time travel
      const blocksToMine = 2000 / 13.15
      await mineBlocks(blocksToMine)
      //harvest rewards
      await earnHarvestRewards()
      //4 harvest
      await reth.connect(deploySigner).harvest()
      //5 mine one block //Not possible
      await mineBlocks(500 / 13.15)
      //6 harvest
      await reth.connect(deploySigner).harvest()
      //7 Commit user
      const harvestIndex = await reth.harvestIndex()
      res = await reth.connect(deploySigner).commitUsers([user6.address,user7.address,user2.address,user3.address], harvestIndex - 1)
      res.wait().then(console.log)
    }).timeout('100s')
  })
}

async function communityUserCases() {
   describe("Community User cases", async function () {
    it("#32 A community user can claim rewards", async () => {
      await resetFork();
      //1 Take Loan
      const amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(20).div(100))
      await reth.connect(user7).takeLoan(amtLoan, { value: ethers.utils.parseEther('100') })
      //2 rebalance
      await reth.connect(deploySigner).rebalance()
      //3 time travel
      const blocksToMine = 1000 / 13.15
      await mineBlocks(blocksToMine)
      //Claim rewards
      tx = await reth.connect(deploySigner).claimRewards();
      rx = await tx.wait()
      res = await getPastEventsFromReceipt(rx, 'claimedVault')
      expect(parseInt(res[1])).to.greaterThan(0)
      expect(parseInt(res[2])).to.greaterThan(0)
    }).timeout('300s')
    it("#33 Claimed rewards are included in the harvest", async () => {
      //All the steps before has been done in 32

      //harvest
      await reth.connect(deploySigner).harvest()

      const compAfterHarvest = await compContract.balanceOf(reth.address)
      const farmAfterHarvest = await farmContract.balanceOf(reth.address)
      expect(compAfterHarvest).to.equal(0)
      expect(farmAfterHarvest).to.equal(0)
    }).timeout('160s')
    it("#34 A harvest can only be run if next time more than minHarvestTime ", async () => {
      // console.log("REDEPLOYING THE CONTRACTS");
      await resetFork()
      // harvest once 
      await reth.connect(deploySigner).harvest()
      //1 Take Loan
      const amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(20).div(100))
      await reth.connect(user7).takeLoan(amtLoan, { value: ethers.utils.parseEther('100') })
      //2 rebalance
      await reth.connect(deploySigner).rebalance()
      //3 time travel
      const blocksToMine = 200 / 13.15
      await mineBlocks(blocksToMine)
      //4 harvest
      try {
        await reth.connect(deploySigner).harvest()
        assert.fail(0, 1, 'Transaction went through')
      } catch (err) {
        //success
        expect(err.toString()).to.include("'HARV_ERR'")

      }
    }).timeout('60s')
  })
}
async function emergencyPauseCases() {
  describe("Emergency Pause Cases", async function () {
    it("#43 No new supplies or borrows can take place when an emergency pause has been triggered", async () => {
      // Multisig Pause
      await reth.connect(deploySigner).pause();

      // Alice Takes Loan\
      const AliceAmtLoan = await ethToDai(
        ethers.utils.parseEther("100").mul(20).div(100)
      );
      console.log("amount is" + AliceAmtLoan);

      await expect(
        reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
          value: ethers.utils.parseEther("20"),
        })
      ).to.be.revertedWith("Pausable: paused");

      // Bob Supply 100 ETH
      await expect(
        reth.connect(Bob).deposit({ value: ethers.utils.parseEther("100") })
      ).to.be.revertedWith("Pausable: paused");
    });

    it("#44 Repay and Withdraws can take place when an emergency pause has been triggered", async () => {
      await reth.connect(deploySigner).unpause();
      // Alice take Loan 100ETH 20%
      const AliceAmtLoan = await ethToDai(
        ethers.utils.parseEther("100").mul(20).div(100)
      );
      console.log("amount is" + AliceAmtLoan);

      await reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
        value: ethers.utils.parseEther("100"),
      });

      // Multisig Pause
      await reth.connect(deploySigner).pause();

      // Alice repay
      const AliceAmtRepay = await ethToDai(ethers.utils.parseEther("20"));
      console.log("amount is" + AliceAmtRepay);
      await expect(
        reth.connect(Alice).repay(deploySigner, AliceAmtRepay.toPrecision(23), {
          value: ethers.utils.parseEther("20"),
        })
      ).to.be.revertedWith("Pausable: paused");

      // Alice withdraw
      await expect(
        reth.connect(Alice).withdraw(ethers.utils.parseEther("100"))
      ).to.be.revertedWith("Pausable: paused");
    });

    it("#45 No new actions can be taken when an emergency pause has been triggered", async () => {
      // await reth.connect(deploySigner).unpause();
      // Alice Take Loan
      let AliceAmtLoan = await ethToDai(
        ethers.utils.parseEther("50").mul(20).div(100)
      );
      console.log("amount is" + AliceAmtLoan);

      await reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
        value: ethers.utils.parseEther("50"),
      });

      // Multisig Pause All
      await reth.connect(deploySigner).pauseAll();

      // Alice Take Loan
      AliceAmtLoan = await ethToDai(
        ethers.utils.parseEther("50").mul(20).div(100)
      );
      console.log("amount is" + AliceAmtLoan);

      await expect(
        reth.connect(Alice).takeLoan(AliceAmtLoan.toPrecision(23), {
          value: ethers.utils.parseEther("50"),
        })
      ).to.be.revertedWith("Pausable: paused");

      // Bob supply
      await expect(
        reth.connect(Bob).deposit({ value: ethers.utils.parseEther("100") })
      ).to.be.revertedWith("Pausable: paused");

      // Alice Repay
      await expect(
        reth
          .connect(Alice)
          .repay(deploySigner, 0, { value: ethers.utils.parseEther("0") })
      ).to.be.revertedWith("Pausable: paused");

      // Alice withdraw
      await expect(
        reth.connect(Bob).withdraw(ethers.utils.parseEther("10"))
      ).to.be.revertedWith("Pausable: paused");
    });
  });
}

async function changeSettingsCases() {
  describe("Change Settings Cases", async function () {
    it("#41 Settings can be changed by the multisig", async () => {
      await controller.connect(deploySigner).setCollateralFactorRefi(100);

      await reth.connect(deploySigner).setConfig(100, 100, 100, 10, 5);

      await controller.connect(deploySigner)._setCloseFactor(100);

      await controller.connect(deploySigner)._setLiquidationIncentive(102);

      await evaluator
        .connect(deploySigner)
        .changeDepositRestrictions(
          ethers.utils.parseEther("200"),
          ethers.utils.parseEther("500"),
          ethers.utils.parseEther("200")
        );

      await rseth.connect(deploySigner).setPeriods(200, 300);
    });
    it("#42 Settings Can't be changed by anyone other than multisig", async () => {
      await expect(
        controller.connect(user2).setCollateralFactorRefi(100)
      ).to.be.revertedWith("not Authorised");

      await expect(
        reth.connect(user2).setConfig(100, 100, 100, 10, 5)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      await expect(
        controller.connect(user2)._setCloseFactor(100)
      ).to.be.revertedWith("only admin can set close factor");

      await expect(controller.connect(user2)._setLiquidationIncentive(110));

      let val = await controller.liquidationIncentiveMantissa();
      expect(val).to.be.equal(102);

      await expect(
        evaluator
          .connect(user2)
          .changeDepositRestrictions(
            ethers.utils.parseEther("200"),
            ethers.utils.parseEther("500"),
            ethers.utils.parseEther("200")
          )
      ).to.be.revertedWith("Ownable: caller is not the owner");

      await expect(
        rseth.connect(user2).setPeriods(200, 300)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
}

async function oracleCases() {
  let oracleN;
  describe("Oracle Test Cases", async function () {
    it('Configure for oracle test Cases',async()=>{
      const OracleN = await ethers.getContractFactory("retrieve");
      oracleN = await OracleN.deploy();
  console.log("oracleN deployed to:", oracleN.address);
  await oracleN.connect(deploySigner).setAnswer(ethers.utils.parseEther('0.5'));
  rswap.connect(deploySigner).modifyChainlinkOracle(oracleN.address)
    })
    it("#35 An oracle mismatch will allow an emergency withdraw to trigger", async () => {
      const amtLoan = await ethToDai(
        ethers.utils.parseEther("100").mul(20).div(100)
      );
      await reth.connect(user2).takeLoan(amtLoan, {
        value: ethers.utils.parseEther("100"),
      });

      await reth.connect(deploySigner).rebalance();

      const blocksToMine = 2000 / 13.15;
      await mineBlocks(blocksToMine);

      // change price
      await reth.connect(deploySigner).emergencyWithdraw();

      await evaluator.vaultLTV()

      console.log({LTV: await evaluator.vaultLTVStored()});
    }).timeout('100s');

// it("#36 After an oracle mismatch no further funds will be deposited", async () => {
    //   await resetFork()
    //   const amtLoan = await ethToDai(
    //     ethers.utils.parseEther("100").mul(20).div(100)
    //   );
    //   await reth.connect(user2).takeLoan(amtLoan, {
    //     value: ethers.utils.parseEther("100"),
    //   });

    //   await reth.connect(deploySigner).rebalance();

    //   const blocksToMine = 2000 / 13.15;
    //   await mineBlocks(blocksToMine);

    //   // Change price - already changed

    //   reth.connect(deploySigner).emergencyWithdraw();
    //   try {
    //     await reth.connect(deploySigner).rebalance();
    //     assert.fail(0, 1, 'Transaction executed even when paused')
    //   } catch (err) {
    //     expect(err.toString().substr(94, 30)).to.equal("Pausable: paused")
    //   }
    // }).timeout('100s');

    // it("#37 After oracles recover funds will be deposited again #BLOCKED", async () => {
    //   await resetFork()
    //   const amtLoan = await ethToDai(
    //     ethers.utils.parseEther("100").mul(20).div(100)
    //   );
    //   await reth.connect(user2).takeLoan(amtLoan, {
    //     value: ethers.utils.parseEther("100"),
    //   });

    //   await reth.connect(deploySigner).rebalance();

    //   const blocksToMine = 2000 / 13.15;
    //   await mineBlocks(blocksToMine);

    //   // Change price

    //   reth.connect(deploySigner).emergencyWithdraw();

    //   // Change price

    //   await reth.connect(deploySigner).rebalance();
    // }).timeout('100s');
  });
}

  async function botTestCases() {
    describe('bot Test case', async () => {
      it('Rebalance bot', async () => {
        console.log('Deploying rebalance bot');
  
        ReBot = await ethers.getContractFactory("rebalanceResolver");
        reBot = await ReBot.deploy(reth.address, evaluator.address);
        console.log("reBot deployed to:", reBot.address);
        // deposit 
        deposit = '10';
        await reth.connect(user2).deposit({ value: ethers.utils.parseEther(deposit) })
        res = await reBot.checker();
        //rebalance should be done as LTV < tLTV
        expect(res.canExec).to.be.true;
        //rebalance
        await reth.connect(deploySigner).rebalance();
        //check again should be false as recently rebalanced
        console.log({ currentLTV: (await reBot.vaultLTVmantissa()).toString() });
        res = await reBot.checker();
        expect(res.canExec).to.be.false;
  
        //create scenario with LTV > maxLTV
        await reth.connect(user2).borrow(await ethToDai(ethers.utils.parseEther(deposit).mul(55).div(100)));
        console.log({ currentLTV: (await reBot.vaultLTVmantissa()).toString() });
        res = await reBot.checker();
        expect(res.canExec).to.be.true;
  
        //rebalance
        await reth.connect(deploySigner).rebalance();
        //check again should be false as recently rebalanced
        console.log({ currentLTV: (await reBot.vaultLTVmantissa()).toString() });
        res = await reBot.checker();
        expect(res.canExec).to.be.false;
  
        //create scenario Dai balance of vault > min required to deposit (by sending 100 Dai to Vault)
        const accountToInpersonate = "0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0"
  
        await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [accountToInpersonate],
        });
  
        await dai.connect(await ethers.getSigner(accountToInpersonate)).transfer(reth.address, ethers.utils.parseEther("100"))
        await hre.network.provider.request({
          method: "hardhat_stopImpersonatingAccount",
          params: [accountToInpersonate],
        });
  
        //check bot status 
        //even if current LTV = Target LTV (approx) it should rebalance
        console.log({ currentLTV: (await reBot.vaultLTVmantissa()).toString() });
        res = await reBot.checker();
        expect(res.canExec).to.be.true;
  
        await reth.rebalance();
        //check again should be false as recently rebalanced
        console.log({ currentLTV: (await reBot.vaultLTVmantissa()).toString() });
        res = await reBot.checker();
        expect(res.canExec).to.be.false;
      }).timeout('100s')
  
      it('Claim Tokens bot', async () => {
        await resetFork()
        console.log('Deploying rebalance bot');
  
        ClaimBot = await ethers.getContractFactory("claimTokensResolver");
        claimBot = await ClaimBot.deploy(reth.address);
        console.log("claimBot deployed to:", claimBot.address);
  
        //when no deposit should always be false
        expect((await claimBot.checker()).canExec).to.be.false
  
        //add funds and generate rewards
        await reth.connect(user2).deposit({value:ethers.utils.parseEther('10')})
        await reth.rebalance();
        await mineBlocks(100)
        await earnHarvestRewards()
        //check if rewards now have enabled canExec
        expect((await claimBot.checker()).canExec).to.be.true
        //execute
        tx = await reth.connect(deploySigner).claimRewards();
        rx = await tx.wait()
        res = await getPastEventsFromReceipt(rx, 'claimedVault')
        expect(parseInt(res[1])).to.greaterThan(0)
        expect(parseInt(res[2])).to.greaterThan(0)
      }).timeout('100s')
      it('Initiate Harvest bot', async () => {
        await resetFork()
        console.log('Deploying Harvest bot');
  
        HarvestBot = await ethers.getContractFactory("harvestResolver");
        harvestBot = await HarvestBot.deploy(reth.address,evaluator.address);
        console.log("harvestBot deployed to:", harvestBot.address);
  
        //when no harvests needs to be executed as time of last harvest + minTime < current time
        expect((await harvestBot.checker()).canExec).to.be.true
        await reth.harvest();
        // Should be false just after harvesting is done
        expect((await harvestBot.checker()).canExec).to.be.false
  
        await reth.connect(user2).deposit({value:ethers.utils.parseEther('1')});
  
        //send comp rewards less than triggering amount
        let accountToInpersonate = "0x7587cAefc8096f5F40ACB83A09Df031a018C66ec"
  
          await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [accountToInpersonate],
          });
  
          await compContract.connect(await ethers.getSigner(accountToInpersonate)).transfer(reth.address, ethers.utils.parseEther("0.5"))
          await hre.network.provider.request({
            method: "hardhat_stopImpersonatingAccount",
            params: [accountToInpersonate],
          });
          expect((await harvestBot.checker()).canExec).to.be.false
          //send farm rewards less than triggering amount
           accountToInpersonate = "0xF977814e90dA44bFA03b6295A0616a897441aceC"
  
          await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [accountToInpersonate],
          });
  
          await farmContract.connect(await ethers.getSigner(accountToInpersonate)).transfer(reth.address, ethers.utils.parseEther("0.5"))
          await hre.network.provider.request({
            method: "hardhat_stopImpersonatingAccount",
            params: [accountToInpersonate],
          });
          expect((await harvestBot.checker()).canExec).to.be.false
  
          //send comp rewards greater than the trigger
          accountToInpersonate = "0x7587cAefc8096f5F40ACB83A09Df031a018C66ec"
  
          await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [accountToInpersonate],
          });
  
          await compContract.connect(await ethers.getSigner(accountToInpersonate)).transfer(reth.address, ethers.utils.parseEther("1"))
          await hre.network.provider.request({
            method: "hardhat_stopImpersonatingAccount",
            params: [accountToInpersonate],
          });
          expect((await harvestBot.checker()).canExec).to.be.true
          res = await reth.harvest();
          console.log(
            {res:(await getPastEventsFromReceipt(await res.wait(),'harvested')).lenderDAI.toString()}
          );
          console.log({compBal: (await compContract.balanceOf(reth.address)).toString(),moinout:(await rswap.minOut(ethers.utils.parseEther('1.5'),compAddress,daiAddress)).toString()});
          expect((await harvestBot.checker()).canExec).to.be.false
          //send farm rewards greater than the trigger
          accountToInpersonate = "0xF977814e90dA44bFA03b6295A0616a897441aceC"
  
          await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [accountToInpersonate],
          });
  
          await farmContract.connect(await ethers.getSigner(accountToInpersonate)).transfer(reth.address, ethers.utils.parseEther("1.1"))
          await hre.network.provider.request({
            method: "hardhat_stopImpersonatingAccount",
            params: [accountToInpersonate],
          });
          expect((await harvestBot.checker()).canExec).to.be.true
          await reth.harvest();
          expect((await harvestBot.checker()).canExec).to.be.false
          //If time is greater than minTime
          await mineBlocks(500/13.15);
          expect((await harvestBot.checker()).canExec).to.be.true
          await reth.harvest();
          expect((await harvestBot.checker()).canExec).to.be.false
      }).timeout('100s')


            it('Initiate CommitUser bot', async () => {
        await resetFork()
        console.log('Deploying CommitUser bot');
  
        CommitUserBot = await ethers.getContractFactory("CommitUserResolver");
        commitUserBot = await CommitUserBot.deploy(reth.address,evaluator.address);
        console.log("commitUserBot deployed to:", commitUserBot.address);

        //Asthere is no user should return false
        expect((await commitUserBot.checker()).canExec).to.be.false

        //1 Take Loan
        const amtLoan = await ethToDai(ethers.utils.parseEther('10').mul(40).div(100))
        await reth.connect(user6).takeLoan(amtLoan, { value: ethers.utils.parseEther('10') })
        await reth.connect(user4).takeLoan(amtLoan, { value: ethers.utils.parseEther('10') })
        await reth.connect(user3).takeLoan(amtLoan, { value: ethers.utils.parseEther('10') })
        //2 rebalance
        await reth.connect(deploySigner).rebalance()
        //3 time travel
        const blocksToMine = 2000 / 13.15
        await mineBlocks(blocksToMine)
        //harvest rewards
        await earnHarvestRewards()
        //4 harvest
        await reth.connect(deploySigner).harvest()
        await mineBlocks(blocksToMine)
        await reth.connect(deploySigner).harvest()
        //7 Commit user
        const harvestIndex = await reth.harvestIndex()

        expect((await commitUserBot.checker()).canExec).to.be.true
        console.log({user:await commitUserBot.checker()});
  
        res = await reth.connect(deploySigner).commitUsers([user6.address, user4.address, user3.address], harvestIndex )

        console.log({user:await commitUserBot.checker()});
        expect((await commitUserBot.checker()).canExec).to.be.false
        
      }).timeout('200s')

      it("liquidate User Bot", async () => {

        await resetFork();
        
        deposit = "100"
        blocksToMine = 1000//6570 //((60*60*24)/13.15)
        amtLoan = await ethToDai(ethers.utils.parseEther('100').mul(59).div(100))

        await reth.connect(user7).deposit({value: ethers.utils.parseEther('0.1')})
        await reth.connect(user2).takeLoan(amtLoan, {value: ethers.utils.parseEther(deposit)})

        liquidateUserBot = await ethers.getContractFactory("liquidateResolver");
        liquidateUserBot = await liquidateUserBot.deploy(reth.address,evaluator.address,controller.address);
        console.log("liquidateUserBot deployed to:", liquidateUserBot.address);

        //Asthere is no user to liquidate should return false
        expect((await liquidateUserBot.checker()).canExec).to.be.false

        newCollateralFactor = '500000000000000000' //0.5

        closeFactor = await controller.closeFactorMantissa()
        liquidateAmount = (amtLoan*(closeFactor/1e18)).toPrecision(24)

        await controller.connect(deploySigner).setCollateralFactorRefi(newCollateralFactor)

        expect((await liquidateUserBot.checker()).canExec).to.be.true

      }).timeout('100s')
      
    })
  }

  async function whitelisting() {
    describe('Whitelisting Checking', async() => {
      it('scenarios to confirm the whitelist functionality is working', async() => {

        await resetFork();

        await truffleAssert.reverts(
          reth.connect(user8).deposit({value: ethers.utils.parseEther('1')}),
          "AUR_ERR"
        )

        balBefore = await reth.balanceOf(user8.address)

        await evaluator.connect(deploySigner).doWhitelist(user8.address)

        await reth.connect(user8).deposit({value: ethers.utils.parseEther('1')})

        balAfter = await reth.balanceOf(user8.address)

        expect(parseInt(balBefore)).to.be.equal(0)
        expect(parseInt(balBefore)).to.be.lessThan(parseInt(balAfter))


      })
    })
    
  }
  
  async function frontendCases() {
    describe("creating scenario", async function () {
      it("setting up the user2 for claiming rewards user 3 for repayments and user 4 for stability earnings", async () => {
        //deposit
        await resetFork();
        await rseth.connect(deploySigner).setAddress(evaluator.address)
        await reth.connect(user2).deposit({ value: ethers.utils.parseEther('50') })
        borrow = await ethToDai(ethers.utils.parseEther('50').mul(10).div(100))
        await reth.connect(user3).takeLoan(borrow, { value: ethers.utils.parseEther('50') })
        await rseth.connect(user4).stake({ value: ethers.utils.parseEther('50') })
        //2 rebalance
        await reth.connect(deploySigner).rebalance()
        //3 time travel        
        const blocksToMine = 500 / 13.15
        await mineBlocks(blocksToMine)
        //Claim rewards        
        await earnHarvestRewards()        
        tx = await reth.connect(deploySigner).claimRewards();        
        rx = await tx.wait()
        res = await getPastEventsFromReceipt(rx, 'claimedVault')
        expect(parseInt(res[1])).to.greaterThan(0)
        expect(parseInt(res[2])).to.greaterThan(0)
  
        await reth.connect(deploySigner).harvest()
        await mineBlocks(blocksToMine)
        await reth.connect(deploySigner).harvest()
        await reth.connect(deploySigner).commitUsers([user2.address,user3.address],await reth.harvestIndex());
        // console.log({rewards : (await reth.userData(user3.address)).rewards.toString()});
        // console.log({rewards : (await reth.userData(user2.address)).rewards.toString()});
        // console.log({data : (await reth.harvestData(0)).yieldAmt.toString()});
        // console.log({repaid : (await reth.userData(user3.address)).repaid.toString(),borrowBal: (await reth.borrowBalanceStored(user3.address)).toString()});
        // tx = await reth.connect(user2).claimUser();
        // console.log({clamed :((await getPastEventsFromReceipt(await tx.wait(),'Transfer')))});
        // console.log({reth:await reth.balanceOf(rseth.address),rs:await rseth.totalSupply()});
      }).timeout('200s')
    })
  }
  


  describe("Deploy & Test Contracts", async function () {
    it("deployment of contracts", async function () {
      await getAddresses();
      await deploy();
    }).timeout('60s')
    it("Testing Contracts", async function () {
        await checkReth();
        // await stabilityUserCheck();
      //  await commitingUserCases();
      //  await communityUserCases();
      //  await oracleCases()
      //  await testScenarios();
      //  await botTestCases();
      //  await frontendCases();
      //  await whitelisting();
    })
  })







//Helpers
async function earnHarvestRewards() {
  const stratAbi = [{ "inputs": [{ "internalType": "address", "name": "_storage", "type": "address" }, { "internalType": "address", "name": "_vault", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "Liquidating", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "profitAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "feeAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "ProfitAndBuybackLog", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "profitAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "feeAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "ProfitLogInReward", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }], "name": "ProfitsNotCollected", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "WETH2underlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__aave", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__comp", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__dai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__idle", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__idleUnderlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "__stkaave", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allowedRewardClaimable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "claimAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "claimReward", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "controller", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "depositArbCheck", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "doHardWork", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "governance", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "idleTokenHelper", "outputs": [{ "internalType": "contract IIdleTokenHelper", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "idleUnderlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "investAllUnderlying", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "investedUnderlyingBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "multiSig", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingDenominator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "profitSharingNumerator", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "protected", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "referral", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "reward2WETH", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rewardTokens", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "salvage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "sell", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "_claimAllowed", "type": "bool" }], "name": "setClaimAllowed", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "bool", "name": "_sell", "type": "bool" }], "name": "setLiquidation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "setMultiSig", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "_protected", "type": "bool" }], "name": "setProtected", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_newRef", "type": "address" }], "name": "setReferral", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "flag", "type": "bool" }], "name": "setRewardClaimable", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_store", "type": "address" }], "name": "setStorage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "stkaave", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "store", "outputs": [{ "internalType": "contract Storage", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "sushiswapRouterV2", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "underlying", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "uniswapRouterV2", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "unsalvagableTokens", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "useUni", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "vault", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "virtualPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "weth", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawAllToVault", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amountUnderlying", "type": "uint256" }], "name": "withdrawToVault", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
  const stratAddress = "0x9f357122F72a056E8A58CE89d3D88f62411c465C";
  const stratContract = await new ethers.Contract(stratAddress, stratAbi, harvestGov)
  await stratContract.connect(harvestGov).doHardWork()
}
async function getPastEventsFromReceipt(receipt, event) {

  logs = receipt.events;
  var value

  logs.forEach((log) => {
    if (log.event == event) {
      value = log.args;
      return
    }
  })

  return value;
}
async function mineBlocks(blockNumber) {

  block = await web3.eth.getBlock('latest')
  time = block.timestamp

  while (blockNumber > 0) {
    blockNumber--;
    time += 13.5
    await network.provider.send("evm_mine", [time])
  }
}
async function ethToDai(amount) {
  const ethUSD = await oracle.getUnderlyingPrice("0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5")
  const daiUSD = await oracle.getUnderlyingPrice("0x5d3a536e4d6dbd6114cc1ead35777bab948e3643")
  return amount.mul(ethUSD).div(daiUSD);
}
