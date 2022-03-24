/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();

require("@nomiclabs/hardhat-waffle");

// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");

const { API_URL, ETHERSCAN_API_KEY, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};
