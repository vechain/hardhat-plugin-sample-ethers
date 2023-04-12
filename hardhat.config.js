require("@nomicfoundation/hardhat-toolbox");

require("@vechain/hardhat-vechain");
require("@vechain/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
  },
  networks: {
    vechain: {
      url: "http://127.0.0.1:8669",
      accounts: {
        mnemonic: "denial kitchen pet squirrel other broom bar gas better priority spoil cross",
        count: 10,
      },
      restful: true,
      gas: 10000000,
    },
  },
};
