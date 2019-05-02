//this script is inspired by: https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js

const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = "chalk any fine raccoon adjust join doll insect whip gospel photo wish" //infura mnemonic
const INFURA_KEY = "9686c812fd2b427090fe8a215dc688a4" //as taken from link https://rinkeby.infura.io/v3/9686c812fd2b427090fe8a215dc688a4
const NFT_CONTRACT_ADDRESS = "0x38BE8aaC33582A5962aE60B44c9e322A06532b52" //SolnSquareVerifier Solidity Contract (deployed to rinkeby)
const OWNER_ADDRESS = "0xFEBa09638e5f2097dF203096850D6111e1294269" //my rinkeby address (has test ether, same address used to deploy contract)
const NETWORK = "rinkeby"
const NUM_CREATURES = 10 //number of NFTs to be minted!


if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const NFT_CONTRACT = require('./build/contracts/solnSquareVerifier');
const NFT_ABI = NFT_CONTRACT.abi; 
console.log(NFT_ABI);

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, {from: OWNER_ADDRESS, gasLimit: "1000000" })
        console.log(nftContract);
        //URI
        //let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
        //current proof
        //let currentProof = proof[i];
        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_CREATURES; i++) {
            try {
                //mint using the inhireted method (no need for a proof)
                console.log('inside try');
                const result = await nftContract.methods.mint(OWNER_ADDRESS, 3, "").send({from: OWNER_ADDRESS, gas: 553000});
                //let result = await nftContract.methods.balanceOf(OWNER_ADDRESS).send({from: OWNER_ADDRESS, gas: 553000})
                console.log(result)
            } catch (e) {
                console.log(`Encountered error while minting`, e.message);
            }
       }

    }
    console.log('end!');
}

main()
