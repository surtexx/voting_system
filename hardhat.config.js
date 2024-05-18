require('@nomiclabs/hardhat-ethers');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.0",
    networks: {
        hardhat: {
            gas: "auto",
            blockGasLimit: 60000000,
            mining: {
                interval: 500, //ms
            }
        }
    }
};