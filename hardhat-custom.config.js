// hardhat-custom.config.js
require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,  // Minimum value for maximum size reduction
        details: {
          yul: true,
          yulDetails: {
            stackAllocation: true,
            optimizerSteps: 'dhfoDgvulfnTUtnIf'
          }
        }
      },
      viaIR: true  // Enable IR-based code generation
    }
  },
  networks: {
    primordial: {
      url: "https://rpc.primordial.bdagscan.com",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      chainId: 1043,
      gasMultiplier: 1.2,
      // These are the important settings to bypass the fee cap
      txGasPrice: 50000000000,  // 50 gwei
      gasPrice: 50000000000,    // 50 gwei
      gasLimit: 20000000,       // High gas limit
      timeout: 200000,          // Longer timeout
      txFeeCap: 5000000000000000000 // 5 BDAG
    },
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://localhost:8545",
    }
  },
  etherscan: {
    apiKey: {
      primordial: "no-api-key-needed"
    },
    customChains: [
      {
        network: "primordial",
        chainId: 1043,
        urls: {
          apiURL: "https://primordial.bdagscan.com/api",
          browserURL: "https://primordial.bdagscan.com"
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 60000
  }
};