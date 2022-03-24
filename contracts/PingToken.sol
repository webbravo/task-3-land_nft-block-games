// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PingToken is ERC20, Ownable {
    using SafeMath for uint256;

    // Set Token per ether price
    uint256 public tokensPerEth = 1000;

    constructor() ERC20("PingToken", "PGT") {
        uint256 initialSupply = 1000000 * 10**decimals();

        // Mint the new set of tokens
        _mint(msg.sender, initialSupply);
    }

    // This function allows anyonw to buy Token
    function buyToken(address _receiver) public payable returns (bool) {
        require(msg.value > 0, "Send ETH to buy some tokens");

        // Calculate the amount of tokens to buy
        // Based on how much Ether was sent/paid
        uint256 amountToBuy = tokensPerEth.mul(msg.value);

        // check if the Vendor Contract has enough amount of tokens for the transaction
        uint256 vendorBalance = balanceOf(owner());
        require(vendorBalance >= amountToBuy, "Insuffencient balance - Owner");

        // Transfer token to the msg.sender from the Contract's balance
        bool sent = transfer(_receiver, amountToBuy);
        require(sent, "Failed to transfer token to user");

        // Return the result of the transfer (true/false)
        return sent;
    }

    // update the total Supply of tokens
    function incrementTotalSupply(uint256 amount)
        public
        view
        onlyOwner
        returns (uint256)
    {
        return SafeMath.add(amount, totalSupply());
    }

    // Get the total Supply of tokens
    function getTotalSupply() public view returns (uint256) {
        return totalSupply();
    }

    /**
     * @notice Allow the owner of the contract to withdraw ETH
     */
    function withdraw() public onlyOwner {
        uint256 ownerBalance = address(this).balance;
        require(ownerBalance > 0, "Owner has not balance to withdraw");

        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send user balance back to the owner");
    }
}
