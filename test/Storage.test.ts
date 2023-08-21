import {ethers} from "hardhat";
import {ClausesBuilder} from "@vechain/hardhat-vechain/dist/clausesBuilder";

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
    const abi = Storage.interface.format(ethers.utils.FormatTypes.json) as string;
    await storage.deployed();

    return { storage, owner, otherAccount, abi };
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

    it("Should revert when > 100 with permission denied", async function () {
      const { storage, owner, otherAccount } = await deploy();
      await expect(storage.store(101)).to.be.revertedWith('Number must be < 100');
    });

    it("Should process tx with multiple clauses", async function () {
      const { storage, owner, otherAccount, abi } = await deploy();
      const network = await ethers.provider.getNetwork();
      let builder = new ClausesBuilder(storage);
      builder = await builder.withClause({
        args: [10],
        abi: abi,
        method: 'store'
      }).withClause({
        args: [95],
        abi: abi,
        method: 'store'
      });
      if (network.name.includes('vechain')) {
        const tx = await builder.send();
        expect(tx).to.exist;
      } else {
        let error: Error | undefined;
        try {
          await builder.send();
        } catch (e) {
          error = e as Error;
        }
        expect(error?.message).to.equal('vechain hardhat plugin requires vechain network for clauses operation')
      }
    });
  });



});
