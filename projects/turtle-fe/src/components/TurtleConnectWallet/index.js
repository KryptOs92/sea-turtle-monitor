import { useWallet, Wallet, WalletId } from "@txnlab/use-wallet-react";
import Account from "../Account";

// Import da MUI (o dalla libreria Creative Tim che fa wrapper di MUI)
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Icon from "@mui/material/Icon";

import MDButton from "/src/components/MDButton";
import MDBox from "/src/components/MDBox";

export default function TurtleConnectWallet({ openModal, closeModal }) {
  const { wallets, activeAddress } = useWallet();

  const isKmd = (wallet) => wallet.id === WalletId.KMD;

  return (
    <Dialog open={openModal} onClose={closeModal} fullWidth maxWidth="sm">
      {/* Titolo modale */}
      <DialogTitle>Select wallet provider</DialogTitle>

      <DialogContent dividers>
        {/* Se c’è un indirizzo attivo, mostriamo l’account e un divisore */}
        {activeAddress && (
          <>
            <Account />
            <hr className="my-3" />
          </>
        )}

        <MDBox display="flex" flexDirection="column" pt={2}>
          {/* Se non c’è un indirizzo attivo, mostriamo i wallet da connettere */}
          {!activeAddress &&
            wallets?.map((wallet) => (
              <MDButton
                key={`provider-${wallet.id}`}
                data-test-id={`${wallet.id}-connect`}
                // Esempio di stile personalizzato, se vuoi
                // color="info" variant="outlined" ...
                onClick={() => wallet.connect()}
                // se usi tailwind, puoi aggiungere className="m-2 border-teal-800 ..."
                className="m-2 border-teal-800 border"
              >
                {/* Se non è KMD, mostriamo l’icona (metadata.icon) */}
                {!isKmd(wallet) && (
                  <img
                    alt={`wallet_icon_${wallet.id}`}
                    src={wallet.metadata.icon}
                    style={{ objectFit: "contain", width: 30, height: "auto", marginRight: 8 }}
                  />
                )}
                {isKmd(wallet) ? "LocalNet Wallet" : wallet.metadata.name}
              </MDButton>
            ))}
        </MDBox>
      </DialogContent>

      <DialogActions>
        {/* Pulsante di chiusura */}
        <MDButton data-test-id="close-wallet-modal" color="dark" variant="outlined" onClick={closeModal}>
          Close
        </MDButton>

        {/* Se esiste un indirizzo attivo, mostriamo Logout */}
        {activeAddress && (
          <MDButton
            color="warning"
            variant="gradient"
            data-test-id="logout"
            onClick={async () => {
              if (wallets) {
                const activeWallet = wallets.find((w) => w.isActive);
                if (activeWallet) {
                  await activeWallet.disconnect();
                } else {
                  // Logout/cleanup per wallet inattivi
                  localStorage.removeItem("@txnlab/use-wallet:v3");
                  window.location.reload();
                }
              }
            }}
          >
            <Icon>logout</Icon>&nbsp; Logout
          </MDButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
