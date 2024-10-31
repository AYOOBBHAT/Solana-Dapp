import {  useState } from 'react';
import PropTypes from 'prop-types';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount } from '@solana/spl-token';

// Define the network (mainnet, devnet, etc.)
const SOLANA_NETWORK = 'https://api.devnet.solana.com';

// Token list URL for fetching metadata (you can use mainnet or devnet token lists)
const TOKEN_LIST_URL = 'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json';

export const TokenMetadata = () => {
  const [metadata, setMetadata] = useState({ ticker: '', logo: null });
  const [tokenAddress, setTokenAddress] = useState(''); // State for token address
  const [loading, setLoading] = useState(false); // State for loading

  const fetchTokenMetadata = async (address) => {
    try {
      setLoading(true);
      const connection = new Connection(SOLANA_NETWORK);
      const tokenPublicKey = new PublicKey(address);

      // Fetch token information using the SPL Token library (on-chain data)
      await getAccount(connection, tokenPublicKey);

      // Fetch the token list (off-chain metadata)
      const response = await fetch(TOKEN_LIST_URL);
      const tokenList = await response.json();

      // Find the metadata for the token
      const tokenMeta = tokenList.tokens.find(token => token.address === address);

      if (tokenMeta) {
        setMetadata({
          ticker: tokenMeta.symbol || 'Unknown Ticker',
          logo: tokenMeta.logoURI || 'https://via.placeholder.com/100',
        });
      } else {
        setMetadata({
          ticker: 'Unknown Ticker',
          logo: 'https://via.placeholder.com/100',
        });
      }
    } catch (error) {
      console.error('Error fetching token metadata:', error);
      setMetadata({
        ticker: 'Error',
        logo: 'https://via.placeholder.com/100',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFetchMetadata = () => {
    if (tokenAddress) {
      fetchTokenMetadata(tokenAddress);
    }
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md max-w-sm mx-auto text-center">
        <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter Token Address"
            className="mb-4 px-auto py-auto border border-yellow-300 rounded-lg w-full text-center focus:outline-none focus:border-yellow-500"
        />
        
        <button 
            onClick={handleFetchMetadata}
            className="px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300"
        >
            Fetch Token Metadata
        </button>

        {loading && <p className="text-yellow-600 mt-4">Loading token metadata...</p>}

        {metadata.ticker && (
            <div className="mt-6">
                <h2 className="text-lg font-bold text-yellow-700">Token Ticker: {metadata.ticker}</h2>
                {metadata.logo && (
                    <img
                        src={metadata.logo}
                        alt={`${metadata.ticker} logo`}
                        width="80"
                        className="mx-auto mt-2 rounded-full shadow-md"
                    />
                )}
            </div>
        )}
    </div>
);
  
};

TokenMetadata.propTypes = {
  tokenAddress: PropTypes.string,
};
