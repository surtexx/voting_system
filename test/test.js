const { ethers } = require("hardhat");

describe("Voting Contract", function () {
    let Voting;
    let voting;
    let VotingTest;
    let votingTest;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        
        // Deploy Voting contract
        Voting = await ethers.getContractFactory("VotingSystem");
        voting = await Voting.deploy(["Candidate 1", "Candidate 2"], 10);
        await voting.deployed();
        
        // Deploy VotingTest contract
        VotingTest = await ethers.getContractFactory("VotingTest");
        votingTest = await VotingTest.deploy();
        await votingTest.deployed();
    });

    describe("VotingTest contract", function () {
        it("should add a new candidate", async function () {
            await votingTest.testAddCandidate("Candidate 3");
        });

        it("should cast a vote", async function () {
            await votingTest.testVote(0);
        });

        it("should get voting status", async function () {
            await votingTest.testGetVotingStatus();
        });
    });
});
