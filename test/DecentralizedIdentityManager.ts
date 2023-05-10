import { expect } from "chai";
import { ethers } from "hardhat";
import { DecentralizedIdentityManager } from "../src/types";
const { time } = require("@nomicfoundation/hardhat-network-helpers");

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

describe("DecentralizedIdentityManager", async () => {
  let DecentralizedIdentityManager;
  let decentralizedIdentityManager: DecentralizedIdentityManager;

  let privateKey: string[] = [];
  let accounts: any[];

  beforeEach(async () => {
    DecentralizedIdentityManager = await ethers.getContractFactory(
      "DecentralizedIdentityManager"
    );
    decentralizedIdentityManager =
      (await DecentralizedIdentityManager.deploy()) as DecentralizedIdentityManager;

    [...accounts] = await ethers.getSigners();

    privateKey.push(process.env.PRIVATE_KEY_ONE || "");
    privateKey.push(process.env.PRIVATE_KEY_TWO || "");
    privateKey.push(process.env.PRIVATE_KEY_THREE || "");
    privateKey.push(process.env.PRIVATE_KEY_FOUR || "");
  });

  describe("Create User Tests", async () => {
    it("Should fail to create user - (Not Authorized)", async () => {
      let nickName = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("firebond")
      );
      let wallet = new ethers.Wallet(privateKey[1]);
      let publicKeyHash = publicKeyToKeccak256(wallet.publicKey);

      await expect(
        decentralizedIdentityManager.createUser(nickName, publicKeyHash)
      ).to.revertedWith("Not authorized");
    });

    it("Should create user", async () => {
      let nickName = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("firebond")
      );
      let wallet = new ethers.Wallet(privateKey[1]);
      let publicKeyHash = publicKeyToKeccak256(wallet.publicKey);

      const tx = await decentralizedIdentityManager
        .connect(accounts[1])
        .createUser(nickName, publicKeyHash);

      const timestamp = await time.latest();

      await expect(tx)
        .to.emit(decentralizedIdentityManager, "UserCreated")
        .withArgs(wallet.address, timestamp);

      let userDetails = await decentralizedIdentityManager.getUser(
        wallet.address
      );

      expect(userDetails.nickname).to.be.equal(nickName);
      expect(userDetails.publicKey).to.be.equal(publicKeyHash);
    });

    it("Should fail to create user", async () => {
      let nickName = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("firebond")
      );
      let wallet = new ethers.Wallet(privateKey[1]);
      let publicKeyHash = publicKeyToKeccak256(wallet.publicKey);

      const tx = await decentralizedIdentityManager
        .connect(accounts[1])
        .createUser(nickName, publicKeyHash);

      const timestamp = await time.latest();

      await expect(tx)
        .to.emit(decentralizedIdentityManager, "UserCreated")
        .withArgs(wallet.address, timestamp);

      await expect(
        decentralizedIdentityManager
          .connect(accounts[1])
          .createUser(nickName, publicKeyHash)
      ).to.rejectedWith("User already exists");
    });
  });

  describe("Update User Test", async () => {
    it("Should fail to update user - (Unauthorized or user Does Not Exist)", async () => {
      let nickName = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("firebond")
      );
      let wallet = new ethers.Wallet(privateKey[1]);
      let publicKeyHash = publicKeyToKeccak256(wallet.publicKey);

      await expect(
        decentralizedIdentityManager.updateUser(
          accounts[0].address,
          nickName,
          publicKeyHash
        )
      ).to.be.rejectedWith("unauthorized or user does not exist");
    });

    it("Should be able to update", async () => {
      let nickName = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("firebond")
      );
      let wallet = new ethers.Wallet(privateKey[1]);
      let publicKeyHash = publicKeyToKeccak256(wallet.publicKey);

      const tx = await decentralizedIdentityManager
        .connect(accounts[1])
        .createUser(nickName, publicKeyHash);

      const timestamp = await time.latest();

      await expect(tx)
        .to.emit(decentralizedIdentityManager, "UserCreated")
        .withArgs(wallet.address, timestamp);

      let userDetails = await decentralizedIdentityManager.getUser(
        wallet.address
      );

      expect(userDetails.nickname).to.be.equal(nickName);
      expect(userDetails.publicKey).to.be.equal(publicKeyHash);

      let newNickName = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("FIREBOND")
      );

      wallet = new ethers.Wallet(privateKey[2]);
      publicKeyHash = publicKeyToKeccak256(wallet.publicKey);
      let updateTx = await decentralizedIdentityManager
        .connect(accounts[1])
        .updateUser(accounts[1].address, newNickName, publicKeyHash);

      await expect(updateTx)
        .to.emit(decentralizedIdentityManager, "UserUpdated")
        .withArgs(accounts[1].address);
    });
  });
});

function publicKeyToKeccak256(publicKey: string) {
  return ethers.utils.keccak256(ethers.utils.hexDataSlice(publicKey, 1));
}
