import { ethers } from "hardhat";

async function main() {
  const DID = await ethers.getContractFactory("DecentralizedIdentityManager");
  const did = await DID.deploy();

  await did.deployed();

  console.log("Decentralized Identity deployed at: ", did.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
