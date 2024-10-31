import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  const onClick = async () => {
    if (!publicKey) {
      alert("Wallet not connected!");
      return;
    }
    if (!signMessage) {
      alert("Wallet does not support message signing!");
      return;
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      const isValid = ed25519.verify(signature, encodedMessage, publicKey.toBuffer());
      if (!isValid) {
        alert("Message signature invalid!");
        return;
      }
      
      alert(`Message signature: ${bs58.encode(signature)}`);
    } catch (error) {
      console.error("Signing failed:", error);
      alert("Message signing failed. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-purple-100 rounded-lg shadow-md max-w-sm mx-auto text-center">
        <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-4 px-4 py-2 border border-purple-300 rounded-lg w-auto text-center focus:outline-none focus:border-purple-500"
        />
        
        <button
            onClick={onClick}
            className="px-4 py-4 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors duration-300"
        >
            Sign Message
        </button>
    </div>
);
}
