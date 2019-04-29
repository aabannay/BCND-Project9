pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
//import the required contracts 
import './verifier.sol';
import './ERC721Mintable.sol';


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId; 
        address owner; 
    }

    // TODO define an array of the above struct
    Solution[] solutionsArray;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) uniqueSolutions; 

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address owner, uint256 tokenId);
    
    // TODO Create a function to add the solutions to the array and emit the event
    function addUniqueSolution(address owner, uint256 tokenId) public {
        //TODO fill the function
        bytes32 unique = keccak256(abi.encodePacked(owner, tokenId));
        require(uniqueSolutions[unique].owner != address(0), 'Solution added already!'); 
        uniqueSolutions[unique] = Solution({tokenId: tokenId, owner: owner}); 
        emit SolutionAdded(owner, tokenId);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address owner, uint256 tokenId) public onlyOwner() {
        bytes32 unique = keccak256(abi.encodePacked(owner, tokenId));
        require(uniqueSolutions[unique].owner != address(0), 'solution is not unique');
        addUniqueSolution(owner, tokenId);

        //TODO handle metadata and tokenSupply!
    }

}
















  


























