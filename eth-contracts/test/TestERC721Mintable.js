var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for (let i=0; i<8; i++) {
                await this.contract.mint(account_one, i, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            console.log(totalSupply);
            assert.Equal(totalSupply, 8, 'Total Supply should be 8');
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_one);
            assert.Equal(balance, 8, 'Balance should be 8');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(1);
            assert.Equal(uri, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', 'URI is not as expected!');
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 1);
            let currentOwner = await this.contract.ownerOf(1);
            assert.Equal(currentOwner, account_two, "Ownership should have transfered!");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let successful = await this.contract.mint(account_one, i, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", {from: account_two});
            assert(!successful, 'Should not be able to mint when not contract owner!');
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.Equal(owner, account_one, "Should get currect owner!");
        })

    });
})