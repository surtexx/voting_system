const { ethers } = require("ethers");

async function registerCandidate(candidateName) {
    [owner] = await signer.getSigners();

    let votinSystemAddress = "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const registerTransaction = await votingSystem.registerAsCandidate(candidateName);
    await registerTransaction.wait();

    console.log("Candidate registered.");
}

async function castVote(candidateAddress) {
    [owner] = await signer.getSigners();

    let votinSystemAddress = "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const voteTransaction = await votingSystem.vote(candidateAddress);
    await voteTransaction.wait();

    console.log("Vote cast.");
}

async function getTotalCandidates() {
    [owner] = await signer.getSigners();

    let votinSystemAddress = "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const totalCandidates = await votingSystem.getTotalCandidates();
    console.log("Total number of candidates:", totalCandidates.toNumber());
}

async function getVotesForCandidate(candidateAddress) {
    [owner] = await signer.getSigners();

    let votinSystemAddress = "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const votes = await votingSystem.getVotesForCandidate(candidateAddress);
    console.log("Votes for candidate:", votes.toNumber());
}

async function getCandidateName(candidateAddress) {
    [owner] = await signer.getSigners();

    let votinSystemAddress = "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const candidateName = await votingSystem.getCandidateName(candidateAddress);
    console.log("Name of candidate:", candidateName);
}

async function transferEthToContract(contractAddress, amount) {
    [owner] = await signer.getSigners();

    let votinSystemAddress = "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5"
    let votingSystem = await ethers.getContractAt("VotingSystem", votinSystemAddress)

    const ethAmount = ethers.utils.parseEther(amount);
    const transferTransaction = await votingSystem.transferETH(contractAddress, ethAmount);
    await transferTransaction.wait();

    console.log("ETH transferred to contract.");
}