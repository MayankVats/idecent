import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: process.env.PRIVATE_KEY_ONE || "",
          balance: "10000000000000000000",
        },
        {
          privateKey: process.env.PRIVATE_KEY_TWO || "",
          balance: "10000000000000000000",
        },
        {
          privateKey: process.env.PRIVATE_KEY_THREE || "",
          balance: "10000000000000000000",
        },
        {
          privateKey: process.env.PRIVATE_KEY_FOUR || "",
          balance: "10000000000000000000",
        },
      ],
    },
    goerli: {
      url: "https://goerli.blockpi.network/v1/rpc/public",
      accounts: [
        {
          privateKey: process.env.PRIVATE_KEY_ONE || "",
          balance: "10000000000000000000",
        },
        {
          privateKey: process.env.PRIVATE_KEY_TWO || "",
          balance: "10000000000000000000",
        },
        {
          privateKey: process.env.PRIVATE_KEY_THREE || "",
          balance: "10000000000000000000",
        },
        {
          privateKey: process.env.PRIVATE_KEY_FOUR || "",
          balance: "10000000000000000000",
        },
      ],
    },
  },
};

export default config;
