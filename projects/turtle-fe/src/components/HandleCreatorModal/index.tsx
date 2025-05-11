// components/CreatorModal.tsx
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import MDBox from "../MDBox";
import MDButton from "../MDButton";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";

import { useMaterialUIController, setDarkMode } from "../../context";

type Mode = "create" | "edit";

interface CreatorModalProps {
  mode: Mode; // "create" | "edit"
  initialAddress?: string; // pre-compila in edit
  addCreator: (addr: string) => Promise<void> | void;
  modifyCreator: (addr: string) => Promise<void> | void;
  buttonLabel?: string; // testo opzionale sul pulsante
}

export default function CreatorModal({ mode, initialAddress = "", addCreator, modifyCreator, buttonLabel }: CreatorModalProps) {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor, gradients, theme } = controller;
  console.log("PALETTEEEE ", theme);

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(initialAddress);

  // aggiorna indirizzo se cambia prop (es. quando apri "edit")
  useEffect(() => setAddress(initialAddress), [initialAddress]);

  const handleConfirm = () => {
    if (mode === "create") {
      addCreator(address);
    } else {
      modifyCreator(address);
    }
    setOpen(false);
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
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" color={darkMode ? "white" : "dark"}>
        <MDBox sx={dialogStyle}>
          <MDTypography variant="h5" mb={1}>
            {title}
          </MDTypography>

          <DialogContent>
            <MDInput fullWidth label="Indirizzo creator" value={address} onChange={(e) => setAddress(e.target.value)} autoFocus />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <MDButton sx={buttonStyle} onClick={() => setOpen(false)}>
              Annulla
            </MDButton>

            <MDButton sx={buttonStyle} onClick={handleConfirm}>
              {mode === "create" ? "Crea" : "Salva"}
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>
    </>
  );
}
