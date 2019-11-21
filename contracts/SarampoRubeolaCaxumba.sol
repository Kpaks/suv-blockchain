pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Pausable.sol";

contract SarampoRubeolaCaxumba is ERC721Full, ERC721MetadataMintable, ERC721Pausable {
  constructor() ERC721Full("SarampoRubeolaCaxumba", "SCR") public {
  }
}
