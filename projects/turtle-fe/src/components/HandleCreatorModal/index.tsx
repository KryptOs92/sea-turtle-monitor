// components/CreatorModal.tsx
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MDBox from "../MDBox";
import MDButton from "../MDButton";
import translations from "./translations.json";
import MDInput from "../MDInput";
import { addCreator } from "../../methods";
import { useSelector } from "react-redux";
import { useMaterialUIController, setDarkMode } from "../../context";
import { useTurtleClient } from "../TurtleClientProvider";

type Mode = "create" | "edit";

interface CreatorModalProps {
  mode: Mode; // "create" | "edit"
  initialAddress?: string; // pre-compila in edit
  modifyCreator: (addr: string) => Promise<void> | void;
  buttonLabel?: string; // testo opzionale sul pulsante
}

export default function CreatorModal({ mode, initialAddress = "", modifyCreator, buttonLabel }: CreatorModalProps) {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor, gradients, theme } = controller;

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(initialAddress);
  const [alertMessage, setAlertMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const lang = useSelector((state) => state.lang.value) || "it";
  const t = translations[lang] ?? translations["it"];
  // aggiorna indirizzo se cambia prop (es. quando apri "edit")
  useEffect(() => setAddress(initialAddress), [initialAddress]);
  const turtleClient = useTurtleClient();

  const handleConfirm = async () => {
    if (mode === "create") {
      if (address && address.length > 0) {
        let result = null;
        setShowLoader(true);
        result = await addCreator(turtleClient, address);
        if (!result.success) {
          setAlertMessage(t.create_error);
        }
        setShowLoader(false);
      } else {
        setAlertMessage(t.create_error_no_address);
      }
    } else {
      modifyCreator(address);
    }
  };

  const buttonStyle = ({ palette: { dark, white }, functions: { rgba } }) => ({
    color: darkMode ? dark.main : white.main, // testo
    backgroundColor: darkMode ? white.main : dark.main, // bg

    transition: "all 200ms ease", // animazione morbida

    "&:hover": {
      // inverte i colori (o qualsiasi altra logica tu voglia)
      color: darkMode ? white.main : dark.main,
      backgroundColor: darkMode ? dark.main : white.main,
    },
  });

  const dialogStyle = ({ palette: { dark, white }, functions: { rgba } }) => ({
    color: darkMode ? white.main : dark.main, // testo
    backgroundColor: darkMode ? dark.main : white.main, // bg
  });

  const title = mode === "create" ? "Aggiungi creator" : "Modifica creator";

  return (
    <>
      {/* ───────────── Pulsante di apertura ───────────── */}
      <MDButton sx={buttonStyle} variant="gradient" onClick={() => setOpen(true)}>
        {buttonLabel ?? title}
      </MDButton>

      {/* ───────────── Dialog MUI ───────────── */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        color={darkMode ? "white" : "dark"}
        aria-labelledby="alert-dialog-title"
      >
        <MDBox sx={dialogStyle}>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

          <DialogContent>
            <MDInput
              fullWidth
              label="Indirizzo creator"
              sx={{ marginTop: "10px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoFocus
            />
            {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <MDButton variant="gradient" sx={buttonStyle} onClick={() => setOpen(false)} disabled={showLoader}>
              Annulla
            </MDButton>

            <MDButton sx={buttonStyle} onClick={handleConfirm} disabled={showLoader}>
              {mode === "create" ? "Crea" : "Salva"}{" "}
              {showLoader === true ? <CircularProgress style={{ height: "20px", width: "20px", marginLeft: "10px" }} /> : <div />}
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>
    </>
  );
}
