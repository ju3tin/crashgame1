import { AppWalletProvider as ImportedAppWalletProvider } from "../../components/AppWalletProvider";
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ImportedAppWalletProvider>{children}</ImportedAppWalletProvider>
      </body>
    </html>
  );
}

export const AppWalletProvider = () => {
    // component logic
};