async function main() {
  const MyFirstNFT = await ethers.getContractFactory("SAONFT");

  // Start deployment, returning a promise that resolves to a contract object
  const myFirstNFT = await MyFirstNFT.deploy();
  await myFirstNFT.deployed();
  console.log("Contract deployed to address:", myFirstNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
