require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

async function main() {
    const VotingSystem = await ethers.getContractFactory("VotingSystem");

    const votingSystem = await VotingSystem.deploy(["BVB", "RMA", "FCB", "MCI"], 90);
    console.log("Contract address:", votingSystem.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});