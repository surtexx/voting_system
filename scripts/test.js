const { ethers } = require("hardhat");

describe("VotingSystem Contract", function () {
    let votingTest;
    let voting;
    let owner;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const TestVoting = await ethers.getContractFactory("TestVoting");
        const VotingSystem = await ethers.getContractFactory("VotingSystem");

        voting = await VotingSystem.connect(owner).deploy();

        votingTest = await TestVoting.connect(owner).deploy(voting);
    });

    describe("VotingTest", function () {
        it("should work", async function () {
            await votingTest.testVotingSystem();
        });
    });
});
