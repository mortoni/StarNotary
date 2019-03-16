import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message,htmlID) {
    const status = document.getElementById(htmlID);
    status.innerHTML = message;
  },

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    await createStar(name, id).send({from: this.account});
    alert(`New Star Owner is ${this.account}`);
  },

  lookUp: async function (){
    const id = parseInt(document.getElementById("lookid").value);
    const starName = await this.meta.methods.lookUptokenIdToStarInfo(id).call();
    const contract = await this.meta.methods.name().call();
    const sym = await this.meta.methods.symbol().call();

    if (starName.length == 0){
      App.setStatus("Star not owned.","status");
      App.setStatus("Star ID: ", 'starData');
      App.setStatus('Star Name: ', 'starLabel');
      App.setStatus("Token Name: ", 'contract');
      App.setStatus("Token Symbol: ", 'symbol');
    }else{
      App.setStatus("Star owned.", 'status');
      App.setStatus(`Star ID: ${id}`, 'starData');
      App.setStatus(`Star Name: ${starName}`, 'starLabel');
      App.setStatus(`Token Name: ${contract}`, 'contract');
      App.setStatus(`Token Symbol: ${sym}`, 'symbol');
    }
  },
};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});