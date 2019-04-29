pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
//import the required contracts 
import './verifier.sol';
import './ERC721Mintable.sol';


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token, Verifier {
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId; 
        address owner; 
    }

    // TODO define an array of the above struct
    Solution[] solutionsArray;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions; 

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address owner, uint256 tokenId);
    
    // TODO Create a function to add the solutions to the array and emit the event
    function addUniqueSolution(address owner, uint256 tokenId, bytes32 unique) public {
        //TODO fill the function
        require(uniqueSolutions[unique].owner == address(0), 'Solution exists already!');
        uniqueSolutions[unique] = Solution({tokenId: tokenId, owner: owner}); 
        emit SolutionAdded(owner, tokenId);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address owner, uint256 tokenId, string memory tokenURI,
            /* added from verifier class (all verification parameters) */
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input) public onlyOwner() returns(bool) {
        
        bool valid = super.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input);
        require(valid, 'Solution is not valid!');
        
        bytes32 unique = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        addUniqueSolution(owner, tokenId, unique);

        super.mint(owner, tokenId, tokenURI);
        return true; 
        //TODO handle metadata and tokenSupply!
        //this is handled by inhiretance. 
    }

}
















  


























