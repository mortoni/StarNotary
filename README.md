# Decentralized Star Notary (DApp)

A smart contract deployed on the Rinkeby public test network, that allows ownership and tranfer of stars. This app implements the interface for <a href = http://erc721.org/>ERC721 </a> is a free, open standard that describes how to build non-fungible or unique tokens on the Ethereum blockchain.


## Token name and token symbol

This test case will check if the star creation with a token name and symbol will match contract.

```javascript
it('can add the star name and star symbol properly', async() => {
    const instance = await StarNotary.deployed();
    const user1 = accounts[1];
    const starId = 101;
    await instance.createStar('vega', starId, {from: user1});

    const ContractName = await instance.name();
    const ContractSymbol = await instance.symbol();
    const starLookUp = await instance.lookUptokenIdToStarInfo(starId);

    assert.equal(ContractName,'StarToken');
    assert.equal(ContractSymbol,'STR');
    assert.equal(starLookUp,'vega');
});
```

## Versions

``openzeppelin-solidity v2.1.3``

``nodejs v11.11.0``

``Truffle v5.0.6``

``Solidity v0.5.0``

## How to run the DApp

1. Clone or download the repo.
2. `npm i` or `yarn install` on root and app folder. 
3. Connect to metamask on port `9545` as private network.
4. `truffle develop` on root.
5. `compile`
6. `migrate --reset` to build contracts.
7. on app folder run: `npm run dev`
8. on a browser open http://localhost:8080/
