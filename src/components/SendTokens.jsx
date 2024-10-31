import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export function SendTokens() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    const to = document.getElementById("to").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!to || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid address and amount.");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      
      alert(`Sent ${amount} SOL to ${to}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    }
  }

  return (
    <div className="p-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg text-white max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-2 text-center">Send Tokens</h2>
        
        <input
            id="to"
            type="text"
            placeholder="Recipient Address"
            className="w-full p-2 mb-2 text-gray-800 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        
        <input
            id="amount"
            type="text"
            placeholder="Amount in SOL"
            className="w-auto p-2 mb-2 text-gray-800 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        
        <button
            onClick={sendTokens}
            className="w-full py-2 bg-white text-teal-600 font-semibold rounded-lg shadow-md hover:bg-teal-100 transition duration-300"
        >
            Send
        </button>
    </div>
);
}
