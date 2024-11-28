"use client"
import DepositDialog from './DepositDialog';

 
import styles from '../styles/components/PageHeader.module.css';

export default function PageHeader() {

	return (
		<header className={styles.PageHeader}>
			<div className={styles.HeaderTitle}>
				<h1>Hooked</h1>
			</div>
           

            { /*
			<ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
					
                   Your app's components go here, nested within the context providers. 
            </WalletProvider>
        </ConnectionProvider>*/ }
<div className={styles.WalletButton}>
				<DepositDialog />
				<w3m-button />
			</div>
		</header>
	);
}
