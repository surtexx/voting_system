require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function registerCandidate(candidateName) {
    [owner, user1] = await ethers.getSigners();

    let votingSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let votingSystem = await ethers.getContractAt("VotingSystem", votingSystemAddress)

    const registerTransaction = await votingSystem.connect(user1).registerAsCandidate(candidateName);
    await registerTransaction.wait();

    console.log("Candidate:", user1.address)
}

async function castVote(candidateAddress) {
    [owner, user1] = await ethers.getSigners();

    let votinSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const voteTransaction = await votingSystem.connect(user1).vote(candidateAddress);
    await voteTransaction.wait();

    console.log("Vote cast.");
}

async function getTotalCandidates() {
    [owner, user1] = await ethers.getSigners();

    let votinSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const totalCandidates = await votingSystem.connect(user1).getTotalCandidates();
    console.log("Total number of candidates:", totalCandidates.toNumber());
}

async function getVotesForCandidate(candidateAddress) {
    [owner, user1] = await ethers.getSigners();

    let votinSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const votes = await votingSystem.connect(user1).getVotesForCandidate(candidateAddress);
    console.log("Votes for candidate:", votes.toNumber());
}

async function getCandidateName(candidateAddress) {
    [owner, user1] = await ethers.getSigners();

    let votinSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const candidateName = await votingSystem.connect(user1).getCandidateName(candidateAddress);
    console.log("Name of candidate:", candidateName);
}

async function transferEthToContract(contractAddress, amount) {
    [owner, user1] = await ethers.getSigners();

    let votinSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const ethAmount = ethers.utils.parseEther(amount);
    const transferTransaction = await votingSystem.connect(user1).transferETH(contractAddress, ethAmount);
    await transferTransaction.wait();

    console.log("ETH transferred to contract.");
}