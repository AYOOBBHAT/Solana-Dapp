import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function requestAirdrop() {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    const amount = document.getElementById("amount").value;
    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );

      // Using the new method for confirming the transaction
      const confirmationStrategy = {
        commitment: 'confirmed', // or 'finalized', 'processed'
        preflightCommitment: 'processed' // Optional
      };

      await connection.confirmTransaction(signature, confirmationStrategy);
      
      alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed. Please try again later.");
    }
  }

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg text-white max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-4 text-center">Request Airdrop</h2>
        
        <input
            id="amount"
            type="text"
            placeholder="Enter Amount in SOL"
            className="w-auto p-4 mb-4 text-gray-800 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        
        <button
            onClick={requestAirdrop}
            className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition duration-300"
        >
            Request Airdrop
        </button>
    </div>
);

}
