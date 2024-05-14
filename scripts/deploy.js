require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function main() {
    const [deployer, user1] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    let VotingSystem = await ethers.getContractFactory("VotingSystem");
    let votingSystem = await VotingSystem.deploy();

    await votingSystem.deployed();

    console.log("VotingSystem deployed to:", votingSystem.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });