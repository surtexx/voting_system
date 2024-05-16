require('@nomiclabs/hardhat-waffle');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks:{
    hardhat:{
      chainId:1337
    }
  }
};

require("@nomiclabs/hardhat-ethers");

task("add-candidate", "Adds a candidate")
    .addParam("name", "The candidate's name")
    .setAction(async (taskArgs) => {
        const { addCandidate } = require("./scripts/interact");
        await addCandidate(taskArgs.name);
    });

task("vote", "Votes for a candidate")
    .addParam("index", "The candidate's index")
    .setAction(async (taskArgs) => {
        const { vote } = require("./scripts/interact");
        await vote(taskArgs.index);
    });

task("get-all-votes", "Gets all votes of candidates")
    .setAction(async () => {
        const { getAllVotesOfCandidates } = require("./scripts/interact");
        await getAllVotesOfCandidates();
    });

task("get-voting-status", "Gets the voting status")
    .setAction(async () => {
        const { getVotingStatus } = require("./scripts/interact");
        await getVotingStatus();
    });

task("get-remaining-time", "Gets the remaining time for voting")
    .setAction(async () => {
        const { getRemainingTime } = require("./scripts/interact");
        await getRemainingTime();
    });

task("transfer-eth", "Transfers ETH")
    .addParam("to", "The recipient address")
    .addParam("amount", "The amount of ETH to transfer")
    .setAction(async (taskArgs) => {
        const { transferETH } = require("./scripts/interact");
        await transferETH(taskArgs.to, taskArgs.amount);
    });

task("get-balance", "Gets the contract balance")
    .setAction(async () => {
        const { getBalance } = require("./scripts/interact");
        await getBalance();
    });
