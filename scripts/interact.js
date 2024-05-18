const { ethers } = require("hardhat");
const { Web3 } = require("web3");

const votingSystemAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function addCandidate(name) {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")); 
    
    const votingSystemABI = require('../artifacts/contracts/VotingSystem.sol/VotingSystem.json').abi;
    let votingSystem = new web3.eth.Contract(votingSystemABI, votingSystemAddress);

    try {
        const accounts = await web3.eth.getAccounts();
        await votingSystem.methods.addCandidate(name).send({ from: accounts[0] });
        console.log(`Candidate ${name} added successfully.`);
    } catch (error) {
        console.error(`Failed to add candidate: ${error}`);
        let errFlat = JSON.stringify(err);
        let { innerError : { message } } = JSON.parse(errFlat);

        message = message.split("'")[1];
        throw new Error(message);
    }
}

async function vote(candidateIndex) {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")); 
    
    const votingSystemABI = require('../artifacts/contracts/VotingSystem.sol/VotingSystem.json').abi;
    const votingSystem = new web3.eth.Contract(votingSystemABI, votingSystemAddress);

    const accounts = await web3.eth.getAccounts();
    try{
        await votingSystem.methods.vote(candidateIndex).send({ from: accounts[0] });
    }
    catch (err) {
        let errFlat = JSON.stringify(err);
        let { innerError : { message } } = JSON.parse(errFlat);

        message = message.split("'")[1];
        throw new Error(message);
    }
}

async function getAllVotesOfCandidates() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")); 
    
    const votingSystemABI = require('../artifacts/contracts/VotingSystem.sol/VotingSystem.json').abi;
    const votingSystem = new web3.eth.Contract(votingSystemABI, votingSystemAddress);

    try {
        const candidates = await votingSystem.methods.getAllVotesOfCandidates().call();
        return candidates;
    } catch (error) {
        console.error(`Failed to get votes: ${error}`);
    }
}

async function getVotingStatus() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")); 
    
    const votingSystemABI = require('../artifacts/contracts/VotingSystem.sol/VotingSystem.json').abi;
    const votingSystem = new web3.eth.Contract(votingSystemABI, votingSystemAddress);

    try {
        const status = await votingSystem.methods.getVotingStatus().call();
        console.log(`Voting is currently ${status ? "open" : "closed"}.`);
        return status;
    } catch (error) {
        console.error(`Failed to get voting status: ${error}`);
    }
}

async function getRemainingTime() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")); 
        
    const votingSystemABI = require('../artifacts/contracts/VotingSystem.sol/VotingSystem.json').abi;
    const votingSystem = new web3.eth.Contract(votingSystemABI, votingSystemAddress);

    try {
        const remainingTime = await votingSystem.methods.getRemainingTime().call();
        console.log(`Remaining voting time: ${remainingTime} seconds.`);
        return remainingTime;
    } catch (error) {
        console.error(`Failed to get remaining time: ${error}`);
    }
}

async function transferETH(to, amount) {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")); 
    
    const votingSystemABI = require('../artifacts/contracts/VotingSystem.sol/VotingSystem.json').abi;
    const votingSystem = new web3.eth.Contract(votingSystemABI, votingSystemAddress);

    try {
        const accounts = await web3.eth.getAccounts();
        const amountInWei = web3.utils.toWei(amount, 'ether');
        await votingSystem.methods.transferETH(to, amountInWei).send({ from: accounts[0], value: amountInWei});
        console.log(`Transferred ${amount} ETH to ${to}.`);
    } catch (err) {
        let errFlat = JSON.stringify(err);
        let { innerError : { message } } = JSON.parse(errFlat);

        message = message.split("'")[1];
        throw new Error(message);
    }
}

async function getBalance(addr) {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")); 
    
    const votingSystemABI = require('../artifacts/contracts/VotingSystem.sol/VotingSystem.json').abi;
    const votingSystem = new web3.eth.Contract(votingSystemABI, votingSystemAddress);

    try {
        const balance = Number(ethers.utils.parseEther(String(await votingSystem.methods.checkBalance(addr).call())));
        console.log(`Contract balance: ${balance} ETH.`);
        return balance;
    } catch (error) {
        console.error(`Failed to get balance: ${error}`);
    }
}

module.exports = {
    addCandidate,
    vote,
    getAllVotesOfCandidates,
    getVotingStatus,
    getRemainingTime,
    transferETH,
    getBalance
};

// // Example usage
// (async () => {
//     await addCandidate("Candidate 3");
//     await vote(0);
//     await getAllVotesOfCandidates();
//     await getVotingStatus();
//     await getRemainingTime();
//     await transferETH("0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097", 1);
// })();