const contract = require("../artifacts/contracts/SOANFT.sol/SAONFT.json");
const nftMetadata = require("../nft-metadata.json");

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

require("dotenv").config();

const { ALCHEMY_API_URL, METAMASK_PUBLIC_KEY, METAMASK_PRIVATE_KEY } =
  process.env;
const web3 = createAlchemyWeb3(ALCHEMY_API_URL);
const contractAddress = "0xAA0Bc7823b23F2Cf05009BaC4Bd3d2d4b7DB9fD3";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

//CREATE THE TRANSACTION
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(
    METAMASK_PUBLIC_KEY,
    "latest"
  ); //get latest nonce

  //the transaction
  const tx = {
    from: METAMASK_PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .mintNFT(METAMASK_PUBLIC_KEY, tokenURI)
      .encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(
    tx,
    METAMASK_PRIVATE_KEY
  );
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT("ipfs://QmRr5GZSKY7WxM2wbsa4U5TT7CK3kWkWWSCzm3wPqXkQov");
