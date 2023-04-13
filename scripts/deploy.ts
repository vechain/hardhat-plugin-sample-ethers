import { ethers } from "hardhat";

const CONTRACT_NAME = "Storage"; // Declare a global variable for the contract name

async function main() {
  const Storage = await ethers.getContractFactory(CONTRACT_NAME); // Use the global variable
  const storage = await Storage.deploy();

  await storage.deployed();

  console.log(
    `${CONTRACT_NAME} deployed to ${storage.address}` // Use the global variable
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
