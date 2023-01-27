// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Storage {
   uint256 number;

    // Declaring an event
    event StoreEvent(address owner); 

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {

        // To demonstrate revert functionality
        require(num < 100, "Number must be < 100");
        

        emit StoreEvent(msg.sender);
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
