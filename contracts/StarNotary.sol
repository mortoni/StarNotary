pragma solidity >=0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
    }

    string public constant name = "StarToken";
    string public constant symbol = "SRT";

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    
    function createStar(string memory _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name); 
        tokenIdToStarInfo[_tokenId] = newStar;
        _mint(msg.sender, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Star you don't owned");
        starsForSale[_tokenId] = _price;
    }

    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }

    function buyStar(uint256 _tokenId) public  payable {
        require(starsForSale[_tokenId] > 0, "The Star should be up for sale");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > starCost, "You need to have enough Ether");
        _transferFrom(ownerAddress, msg.sender, _tokenId);
        address payable ownerAddressPayable = _make_payable(ownerAddress);
        ownerAddressPayable.transfer(starCost);
        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function lookUptokenIdToStarInfo (uint _tokenId) public view returns (string memory) {
        return tokenIdToStarInfo[_tokenId].name;
    }

    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        address sender = msg.sender;
        address address1 = ownerOf(_tokenId1);
        address address2 = ownerOf(_tokenId2);

        if (sender == address1){
            _transferFrom(address1, address2, _tokenId1);
            _transferFrom(address2, address1, _tokenId2);
        }else if (sender == address2){
            _transferFrom(address2, address1, _tokenId2);
            _transferFrom(address1, address2, _tokenId1);
        }
    }

    function transferStar(address _to1, uint256 _tokenId) public {
        address address1 = ownerOf(_tokenId);

        if(msg.sender == address1){
            _transferFrom(address1, _to1, _tokenId);
        }
    }

}