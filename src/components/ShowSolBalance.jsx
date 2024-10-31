import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      if (wallet.publicKey) {
        try {
          const balance = await connection.getBalance(wallet.publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }
      }
    }
    
    fetchBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div className="p-9 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg shadow-lg text-white max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-2 text-center">SOL Balance</h2>
        
        <div className="text-center text-2xl font-semibold">
            {balance !== null ? `${balance} SOL` : "Connecting..."}
        </div>
    </div>
);
}
