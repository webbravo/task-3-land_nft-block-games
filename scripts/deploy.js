async function main() {
  const LandNFT = await ethers.getContractFactory("LandToken");

  // Start deployment, returning a promise that resolves to a contract object
  const landNFT = await LandNFT.deploy();
  await landNFT.deployed();
  console.log("Contract(ERC721) deployed to address:", landNFT.address);

  // Start deployment the ERC20
  const PingToken = await ethers.getContractFactory("PingToken");
  const pingToken = await PingToken.deploy();
  console.log("Contract(ERC20) deployed to address:", pingToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
