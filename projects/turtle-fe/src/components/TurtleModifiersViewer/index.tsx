import { useWallet, Wallet, WalletId } from "@txnlab/use-wallet-react";
import { AlgorandClient, Config } from "@algorandfoundation/algokit-utils";
import React, { useState, useEffect, createContext, useContext } from "react";
import MethodCall from "../MethodCall";
import DataTable from "../../examples/Tables/DataTable";
import * as methods from "../../methods";
import { getAlgodConfigFromViteEnvironment } from "../../utils/network/getAlgoClientConfigs";
import { TurtleMonitorClient } from "../../contracts/TurtleMonitor";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthorityScCreator } from "../../lib/turtleSCslice";
import MDBox from "../MDBox";
import MDButton from "../MDButton";
import formatItalianDateTime from "../../lib/utils";
import Image from "next/image";
import MDInput from "../MDInput";
import translations from "./translations.json";
import sadturtle from "../../assets/images/turtles/sadturtle.png";
import MDAvatar from "../MDAvatar";
import Card from "@mui/material/Card";
import HandleModifierModal from "../HandleModifierModal";
import Grid from "@mui/material/Grid";

import { useMaterialUIController } from "../../context";
import ModifiersTable from "../ModifiersTable";
export const TurtleModifiersViewerContext = createContext({
  getModifiersBoxes: () => {},
});
function TurtleModifiersViewer() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [appId, setAppId] = useState(BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID));
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.lang.value) || "it";
  const t = translations[lang] ?? translations["it"];
  const dispatchStore = useDispatch();
  const { activeAddress, transactionSigner } = useWallet();
  const algodConfig = getAlgodConfigFromViteEnvironment();
  const user_authority = useSelector((state) => state.turtleSC.user_authority);
  const [isAdmin, setIsAdmin] = useState(false);
  const algorand = AlgorandClient.fromConfig({ algodConfig });
  algorand.setDefaultSigner(transactionSigner);
  const [mounted, setMounted] = React.useState(false);
  const [newCreatorAddress, setNewCreatorAddress] = useState("");
  const [modifiers, setModifiers] = useState([]);
  const turtleClient = new TurtleMonitorClient({
    algorand,
    appId: BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID),
    //appId: 1001n,
    defaultSender: activeAddress,
    defaultSigner: transactionSigner,
  });

  const getModifierBoxes = async () => {
    let modifiers = await methods.get_turtle_modifiers(algorand, BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID));
    let modifiersData = [];
    let modifiersAddress = Object.keys(modifiers);
    modifiersAddress.map((addr) => {
      if (modifiers[addr] == "1") {
        modifiersData.push({ address: addr });
      }
    });
    setModifiers(modifiersData);
  };

  useEffect(() => {
    // Esempio: fetch iniziale
    getModifierBoxes();
    setMounted(true);
    // return simile a componentWillUnmount
    return () => {
      // Pulizie: rimuovere event listeners, timer, ecc.
    };
  }, []);
  if (!mounted) {
    // finché siamo in fase SSR o appena montati, mostro un placeholder
    return <div className="turtle-administration-container">Caricamento...</div>;
  }
//5HG4ETNSIEQ6TNVPKFFIC5HRTFRPBYHYTZVCABM5LMTAGI27ZVVZC6OXAM
  return (
    <div className="turtle-administration-container">
      {activeAddress ? (
        <React.Fragment>
          <TurtleModifiersViewerContext.Provider value={{ getModifiersBoxes: getModifierBoxes }}>
            <Card>
              <MDBox
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={1}
                p={2}
                bgColor={darkMode ? "dark" : "white"} // palette.dark.main / palette.white.main
                color={darkMode ? "white" : "dark"}
              >
                <Grid container>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox display="flex" alignItems="center" gap={2}>
                      <h6>{t.boxHeading}</h6>
                      <HandleModifierModal mode="create" />
                    </MDBox>
                  </Grid>
                </Grid>
                {modifiers.length ? (
                  <ModifiersTable modifiers={modifiers} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MDBox
                      variant="gradient"
                      bgColor={darkMode ? "dark" : "white"} // palette.dark.main / palette.white.main
                      color={darkMode ? "white" : "dark"}
                      coloredShadow={darkMode ? "white" : "dark"}
                      borderRadius="xl"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="4rem"
                      height="4rem"
                    >
                      <Image
                        src={sadturtle}
                        alt={"st"}
                        size="100%"
                        quality={100}
                        style={{ width: "100%", height: "100%", display: "block" }}
                      />
                    </MDBox>
                  </div>
                )}
              </MDBox>
            </Card>
          </TurtleModifiersViewerContext.Provider>
        </React.Fragment>
      ) : (
        <React.Fragment>Non sei connesso </React.Fragment>
      )}
    </div>
  );
}

export default TurtleModifiersViewer;
