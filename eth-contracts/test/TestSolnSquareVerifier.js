var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
//var Web3 = require('web3');

contract('TestSolnSquareVerifier', accounts => {

    const correctProof = {
        "proof":
        {
            "A":["0x2836b1a20eabc9cc05cf0731fc3ffdc08418e9c9f9dc37b449c5e45e31dd18f1", "0x09f9d878b54c27927d08c3a7a21e07883b52f35749d3f725500d72473bdd5e0f"],
            "A_p":["0x21480178a19e7f3e2e3f274d1d5a6b16298786ac4eb7e7a986a2c007a8947c30", "0x12ba0458f7f4643e12a60f3faea536d4b353480c82c57d302ebc089e6ad689e9"],
            "B":
                [["0x18c1dd9c46e76c8e50c5c411500a36e452f92d983082083e53eb748541fda4f5", "0x17936ee62858e6762d970a2664dc49a49e328cad6fe23a4115bafd6de2e656ff"], ["0x099f6c82196e5eb303de367315c46a6e4cbcb64cfc151c0a5f9a1edb9db7293d", "0x05c80c34326703cfe69c00d5c4da06dd545d3379c0d5f1bbb4f318438ec01ba2"]],
            
            "B_p":["0x1b37f51679b7c17aaada3f0e122bc29a1c70849f646d5499713e68b3fb73fb73", "0x2b6ad1e82108d30aad8044674de8882b0c2e352f3909db6abe7ce9ba3f43b2ae"],
            "C":["0x18256345bf4adf3535cb52e11813d78f3d31aaa09ab8d8a2a734a0a21ceca56e", "0x2a6fbe4032d7a5ec373350cf30c3a880c75021ff63de80ab131eb80cf052954f"],
            "C_p":["0x00d75f6da841fb04efe00a452a0e95c63b20b5e19fa6a62f8c64e5b143631307", "0x1068954107741d603c83c2045c2fec10bbc01c1b35b6d8f370db2fb50885c99e"],
            "H":["0x1c74d19e566cd8af50ea8688b26a0a6a50dfda58a153595346865b4b8322322f", "0x15294afed219734e59014b1ca5d4c681250eb4503d972839f48e9c140ab76a8b"],
            "K":["0x2682ab3a861299b669bd91e2636de6676fe97f19cbab8f2418e3660f14fc00cd", "0x1291e00f67411aee0535cd3c33d047e62b001610be7f7686535301d2c339867b"]
        },
        "input":[9,1]
    };
    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        //var web3; 
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.new({from: account_one});
            //web3 = new Web3(Web3.givenProvider);
 
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Can add new solution to the contract', async function () {
            let a = correctProof.proof.A;
            let a_p = correctProof.proof.A_p;
            let b = correctProof.proof.B;
            let b_p = correctProof.proof.B_p;
            let c = correctProof.proof.C;
            let c_p = correctProof.proof.C_p;
            let h = correctProof.proof.H;
            let k = correctProof.proof.K;
            let input = correctProof.input;
            let tokenId = 1;
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
            //let unique = web3.utils.sha3(a, a_p, b, b_p, c, c_p, h, k, input);
            //let tx = await this.contract.addUniqueSolution.call(account_one, tokenId, unique, {from: account_one});

            let successful = await this.contract.mintNFT.call(account_one, tokenId, tokenURI, a, a_p, b, b_p, c, c_p, h, k, input); 
            //console.log(successful);

            assert(successful, 'Solution could not be added!');
            
        })


        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('can mint ERC721 token', async function () { 
            let tokenId = 1;
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

            let successful = await this.contract.mint.call(account_one, tokenId, tokenURI); 
            //console.log(successful);
            assert(successful, 'should be able to mint ER721');
        })
    });


})