
// import { useMemo } from 'react';
// import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import {
//     WalletModalProvider,
//     WalletDisconnectButton,
//     WalletMultiButton
// } from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';
// import { SendTokens } from './components/SendTokens';
// import { SignMessage } from './components/SignMessage';
// import { RequestAirdrop } from './components/RequestAirdrop';
// import { ShowSolBalance } from './components/ShowSolBalance';
// import { TokenMetadata } from './components/TokenMetadata';
// import { Footer } from './components/Footer';
// import "@solana/wallet-adapter-react-ui/styles.css";

// function App() {
//     const network = WalletAdapterNetwork.Devnet;
//     const endpoint = useMemo(() => clusterApiUrl(network), [network]);

//     return (
//         <div className="min-h-screen flex flex-col bg-gray-100 p-4">
//             <ConnectionProvider endpoint={endpoint}>
//                 <WalletProvider wallets={[]} autoConnect>
//                     <WalletModalProvider>
//                         {/* Top row with Connect and Disconnect buttons */}
//                         <div className="flex justify-between items-center mb-8">
//                             <WalletMultiButton className="mr-auto" />
//                             <WalletDisconnectButton className="ml-auto" />
//                         </div>

//                         {/* Centered components */}
//                         <div className="flex flex-col items-center space-y-6">
//                             {/* Middle row with two components centered */}
//                             <div className="flex justify-center space-x-8 mb-6">
//                                 <RequestAirdrop />
//                                 <SendTokens />
//                             </div>

//                             {/* Bottom row with three components centered */}
//                             <div className="flex justify-center space-x-6">
//                                 <ShowSolBalance />
//                                 <TokenMetadata tokenAddress="4k3Dyjzvzp8eAgsK8kT7S4U5Yvq4gQ7sG6X87CpLBBU3" />
//                                 <SignMessage />
//                             </div>


//                             <div className="flex justify-center "> 
//                             <Footer />

//                             </div>



//                         </div>
//                     </WalletModalProvider>
//                 </WalletProvider>
//             </ConnectionProvider>
           
//         </div>
//     );
// }

// export default App;


import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SendTokens } from './components/SendTokens';
import { SignMessage } from './components/SignMessage';
import { RequestAirdrop } from './components/RequestAirdrop';
import { ShowSolBalance } from './components/ShowSolBalance';
import { TokenMetadata } from './components/TokenMetadata';
import { Footer } from './components/Footer';
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
    const network = WalletAdapterNetwork.Devnet;

    
    const alchemyRPCUrl = import.meta.env.VITE_ALCHEMY_RPC_URL;

    const endpoint = useMemo(() => alchemyRPCUrl || clusterApiUrl(network), [alchemyRPCUrl, network]);


    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-hidden p-4">
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        {/* Header with Connect and Disconnect buttons */}
                        <div className="flex justify-between items-center mb-4">
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div>

                        {/* Main content area with centered components */}
                        <div className="flex flex-col items-center justify-around flex-grow space-y-6">
                            {/* Row 1 with two centered components */}
                            <div className="flex justify-center space-x-8">
                                <RequestAirdrop />
                                <SendTokens />
                            </div>

                            {/* Row 2 with three centered components */}
                            <div className="flex justify-center space-x-6">
                                <ShowSolBalance />
                                <TokenMetadata tokenAddress="4k3Dyjzvzp8eAgsK8kT7S4U5Yvq4gQ7sG6X87CpLBBU3" />
                                <SignMessage />
                            </div>
                        </div>

                        {/* Footer at the bottom */}
                        <Footer />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
}

export default App;
