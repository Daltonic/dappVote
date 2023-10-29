require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const FLARE_RPC_API_KEY = undefined
console.log(process.env.PRIVATE_KEY)
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    coston: {
      url: "https://coston-api.flare.network/ext/bc/C/rpc" + (FLARE_RPC_API_KEY ? `?x-apikey=${FLARE_RPC_API_KEY}` : ""),
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 16
    },
    coston2: {
      url: "https://coston2-api.flare.network/ext/C/rpc" + (FLARE_RPC_API_KEY ? `?x-apikey=${FLARE_RPC_API_KEY}` : ""),
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 114
    },
    songbird: {
      url: "https://songbird-api.flare.network/ext/bc/C/rpc" + (FLARE_RPC_API_KEY ? `?x-apikey=${FLARE_RPC_API_KEY}` : ""),
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 19
    },
    flare: {
      url: "https://flare-api.flare.network/ext/C/rpc" + (FLARE_RPC_API_KEY ? `?x-apikey=${FLARE_RPC_API_KEY}` : ""),
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 14,
    }
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
}