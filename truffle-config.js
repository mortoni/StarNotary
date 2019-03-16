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
        return new HDWalletProvider("logic kid one myself claim parent mystery account cycle gas accident junk", "https://rinkeby.infura.io/v3/46b9fedcf59d4ab386f0089b9041bf12")
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
