# Udacity Blockchain Capstone

The capstone project builds a decentralized housing product. The idea is to build on ERC721 Token and build a mintable token that includes both and ID and a URL that has access to the metadata about the housing product related to the token. These tokens then are listed on OpenSea Rinkeby Network for sale and they were purchased successfully by another account showing the capablity of listing a property and buying it on the test network. 
## Starting with the code
1. Install the dependancies using `npm install`
2. Compile the code to generate the build folder using `truffle compile`
3. Choose the network and migrate using `truffle migrate --reset (**if migrated before**) --network [development|rinkeby]`
4. Use truffle to run the test using `truffle test`
5. To mint tokens use [myEtherWallet](https://www.myetherwallet.com/)
6. to interact with the tokens minted use [OpenSea Rinkeby](https://rinkeby.opensea.io) 

## Application
This code can be used to list any NFT token to represent any product since the ERC721 allows for selling unequilvant (non fungible toekns a.k.a. NFT).

## Addresses, ABI & OpenSea Store Front
The contract is deployed on the following address
```
0x38BE8aaC33582A5962aE60B44c9e322A06532b52
```
The ABI of the contract is in [this JSON file](SolnSquareVerifier_ABI_Code.JSON).
Finally, OpenSea Store Front is  [Arabian Coin V2](https://rinkeby.opensea.io/assets/arabiancoinv2).

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
