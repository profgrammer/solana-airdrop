const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

// const {publicKey, secretKey} = require('./userWallet')

const key = new Keypair();
console.log(key);

const publicKey = new PublicKey(key._keypair.publicKey).toString();
const secretKey = key._keypair.secretKey;

// const publicKey = new PublicKey(publicKey).toString();

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (error) {
        console.log(error);
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletKeyPair = await Keypair.fromSecretKey(myWallet.secretKey);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
        
    } catch (err) {
        console.log(err);
    }
};

const driver = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driver();