async function main() {
  const LandNFT = await ethers.getContractFactory("LandToken");

  // Start deployment, returning a promise that resolves to a contract object
  const landNFT = await LandNFT.deploy();
  await landNFT.deployed();
  console.log("Contract deployed to address:", landNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
