//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FrogeToken is ERC20, Ownable {

    mapping( address => bool ) public isBlacklisted;

    event BlacklistStatusUpdate(address indexed _wallet, bool status);
    event BulkBlacklistUpdate(address[] wallets, bool _status);

    constructor()ERC20("Froge Token", "FROGE"){
        uint initSupply = 8008580085 ether; // BOOBIES LOL!!
        _mint(owner(), initSupply);
    }

    ///@notice Burn the caller's tokens
    ///@param amount the amount of tokens to burn
    ///@dev only sender tokens are burned
    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }

    ///@notice Same internal transfer function as ERC20 but checks for blacklist
    ///@param sender wallet that sends the tokens
    ///@param recipient wallet that receives the tokens
    ///@param amount the amount of tokens to send
    ///@dev checks that neither sender or recipient are blacklisted; 
    function _transfer(address sender, address recipient, uint amount) internal override {
        require(!isBlacklisted[recipient] && !isBlacklisted[sender], "Blacklisted!");
        super._transfer(recipient, sender, amount);
    }

    ///@notice Change a single Blacklisted wallet status, only owner can update
    ///@param wallet wallet which status is being updated
    ///@param status status of the wallet (true if blacklisted, false if not blacklisted)
    function changeBlacklistStatus(address _wallet, bool _status) external onlyOwner{
        require( isBlacklisted[_wallet] != _wallet, "Already set");
        isBlacklisted[_wallet] = _status;
        emit BlacklistStatusUpdate(_wallet, _status);
    }
    ///@notice Change Blacklisted wallets status in bulk, only owner can update
    ///@param wallets wallets which statuses that are being updated
    ///@param status status of the wallets (true if blacklisted, false if not blacklisted)
    function changeBlacklistStatusBulk(address[] calldata _wallets, bool _status) external onlyOwner{
        for(uint i = 0; i < _wallets.length; i++){
            isBlacklisted[_wallet] = _status;
        }
        emit BulkBlacklistUpdate(_wallets, _status);1
    }
}