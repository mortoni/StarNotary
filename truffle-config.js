const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider("<SEED WORDS>", "<INFURA ENDPOINT>")
      },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
    }
  }
}
