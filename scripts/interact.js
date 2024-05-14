require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function addCandidate(name) {
    owner = await ethers.getSigners();

    const votingSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let votingSystem = await ethers.getContractAt("VotingSystem", votingSystemAddress);

    try {
        const tx = await votingSystem.addCandidate(name);
        await tx.wait();
        console.log(`Candidate ${name} added successfully.`);
    } catch (error) {
        console.error(`Failed to add candidate: ${error}`);
    }
}

async function vote(candidateIndex) {
    owner = await ethers.getSigners();

    const votingSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let votingSystem = await ethers.getContractAt("VotingSystem", votingSystemAddress);

    try {
        const tx = await votingSystem.vote(candidateIndex);
        await tx.wait();
        console.log(`Voted for candidate at index ${candidateIndex}.`);
    } catch (error) {
        console.error(`Failed to vote: ${error}`);
    }
}

async function getAllVotesOfCandidates() {
    owner = await ethers.getSigners();

    const votingSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let votingSystem = await ethers.getContractAt("VotingSystem", votingSystemAddress);

    try {
        const candidates = await votingSystem.getAllVotesOfCandidates();
        console.log("Candidates and their votes:");
        candidates.forEach((candidate, index) => {
            console.log(`Candidate ${index}: ${candidate.name}, Votes: ${candidate.voteCount}`);
        });
    } catch (error) {
        console.error(`Failed to get votes: ${error}`);
    }
}

async function getVotingStatus() {
    owner = await ethers.getSigners();

    const votingSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let votingSystem = await ethers.getContractAt("VotingSystem", votingSystemAddress);

    try {
        const status = await votingSystem.getVotingStatus();
        console.log(`Voting is currently ${status ? "open" : "closed"}.`);
    } catch (error) {
        console.error(`Failed to get voting status: ${error}`);
    }
}

async function getRemainingTime() {
    owner = await ethers.getSigners();

    const votingSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let votingSystem = await ethers.getContractAt("VotingSystem", votingSystemAddress);

    try {
        const remainingTime = await votingSystem.getRemainingTime();
        console.log(`Remaining voting time: ${remainingTime} seconds.`);
    } catch (error) {
        console.error(`Failed to get remaining time: ${error}`);
    }
}

async function transferETH(to, amount) {
    try {
        const tx = await votingSystem.transferETH(to, ethers.utils.parseEther(amount));
        await tx.wait();
        console.log(`Transferred ${amount} ETH to ${to}.`);
    } catch (error) {
        console.error(`Failed to transfer ETH: ${error}`);
    }
}

async function getBalance() {
    try {
        const balance = await votingSystem.getBalance();
        console.log(`Contract balance: ${ethers.utils.formatEther(balance)} ETH.`);
    } catch (error) {
        console.error(`Failed to get balance: ${error}`);
    }
}

// Example usage
// (async () => {
//     await addCandidate("Candidate 3");
//     await vote(0);
//     await getAllVotesOfCandidates();
//     await getVotingStatus();
//     await getRemainingTime();
// })();