require('@nomiclabs/hardhat-ethers');
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    gasReporter: {
        enabled: true,
        currency: 'USD',
        gasPrice: 21
    },
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