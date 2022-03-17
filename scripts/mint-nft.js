const contract = require("../artifacts/contracts/LandNFT.sol/LandToken.json");

require("dotenv").config();
const { API_URL, NFT_CONTRACT_ADDR, PRIVATE_KEY, PUBLIC_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// const contractAddress = "0xcEcCDBE23171d1e9fafAC02E57543D6a9812325c";

const nftContract = new web3.eth.Contract(contract.abi, NFT_CONTRACT_ADDR);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: NFT_CONTRACT_ADDR,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
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

// https://ipfs.io/ipfs/QmRfo8XWN82iw4XZwGCdTw2ZC4cCcbXTTptag4yfh6QN34
// https://ipfs.io/ipfs/QmcGjUT4kiVkup5vUtbD1QDWgaaC6wzCV7UMo9FGzKKH5o
mintNFT("");
