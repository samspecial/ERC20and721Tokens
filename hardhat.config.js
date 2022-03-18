/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
require("@nomiclabs/hardhat-ethers");
const { ALCHEMY_API_URL, METAMASK_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
    },
  },
};
