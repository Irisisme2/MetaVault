require('@matterlabs/hardhat-zksync-deploy');
require('@matterlabs/hardhat-zksync-solc');
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.24",
  },
  networks: {
    zksync: {
      url: 'https://sepolia.era.zksync.dev',
      chainId: 300,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
  },
  zksolc: {
    version: "1.3.3",
    compilerSource: "binary",
    settings: {},
  },
};
