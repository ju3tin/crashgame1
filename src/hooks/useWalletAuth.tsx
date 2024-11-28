import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';
import { useGameStore, GameState } from '../store/gameStore';

export type LoginParams = {
    message: string;
    signature: string;
};

export type UseWalletAuthResult = {
    signIn: () => void;
    canSignIn: boolean;
    isSigningIn: boolean;
    isWalletConnected: boolean;
};

export default function useWalletAuth(): UseWalletAuthResult {
    const { publicKey, connected, signMessage } = useWallet();

    const {
        authenticate,
        getNonce,
        switchWallet,
    } = useGameStore((gameState: GameState) => gameState.actions);

    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

    async function acquireSignature(nonce: string): Promise<LoginParams> {
        if (!connected || !publicKey || !signMessage)
            throw new Error('Wallet not connected or signing not available');

        const domain = window.location.host;
        const origin = window.location.origin;

        const message = `Sign in to Crash\n\nDomain: ${domain}\nOrigin: ${origin}\nNonce: ${nonce}`;
        const encodedMessage = new TextEncoder().encode(message);

        const signature = await signMessage(encodedMessage);

        return {
            message,
            signature: Buffer.from(signature).toString('base64'), // Convert to base64 for easy transport
        };
    }

    async function signIn() {
        setIsSigningIn(true);

        try {
            const nonce = await getNonce();
            const { message, signature } = await acquireSignature(nonce);
            authenticate(message, signature);
        } catch (e) {
            console.error(e);
        }

        setIsSigningIn(false);
    }

    const canSignIn = connected && !!signMessage;

    useEffect(() => {
        if (publicKey) {
            switchWallet(publicKey.toString());
        } else {
            switchWallet(null);
        }
    }, [publicKey]);

    return {
        signIn,
        isSigningIn,
        isWalletConnected: connected,
        canSignIn,
    };
}