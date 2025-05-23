// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import Footer from "../../../../examples/Footer";
import { SupportedWallet, WalletId, WalletManager, WalletProvider } from "@txnlab/use-wallet-react";
import { SnackbarProvider } from "notistack";
import Home from "../../../../Home";
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from "../../../../utils/network/getAlgoClientConfigs";
import DashboardTurtle from "/src/examples/Navbars/DashboardTurtle";
import TurtleAdministration from "/src/components/TurtleAdministration";
let supportedWallets: SupportedWallet[];
if (process.env.NEXT_PUBLIC_VITE_ALGOD_NETWORK === "localnet") {
  const kmdConfig = getKmdConfigFromViteEnvironment();
  supportedWallets = [
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ];
} else {
  supportedWallets = [
    { id: WalletId.DEFLY },
    { id: WalletId.PERA },
    { id: WalletId.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ];
}

function TurtleHome() {
  const algodConfig = getAlgodConfigFromViteEnvironment();
  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: algodConfig.port,
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  });

  return (
    <DashboardLayout>
      <SnackbarProvider maxSnack={3}>
        <WalletProvider manager={walletManager}>
          <DashboardTurtle />
          <TurtleAdministration />
        </WalletProvider>
      </SnackbarProvider>
      <Footer />
    </DashboardLayout>
  );
}

export default TurtleHome;
