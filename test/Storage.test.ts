const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Storage", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.deployed();

    return { storage, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Default value is 0", async function () {
      const { storage, owner, otherAccount } = await deploy();

      expect(await storage.retrieve()).to.equal(0);
    });

    it("Store/Retrieve is working", async function () {
      const { storage, owner, otherAccount } = await deploy();

      await storage.store(15);
      expect(await storage.retrieve()).to.equal(15);
    });

    it("Should emit StoreEvent", async function () {
      const { storage, owner, otherAccount } = await deploy();
  
      await expect(storage.store(42))
        .to.emit(storage, "StoreEvent");
    });
  
    it("Should revert when > 100", async function () {
      const { storage, owner, otherAccount } = await deploy();
      await expect(storage.store(101)).to.be.reverted;
    });

  });



});