import { useWallet, Wallet, WalletId } from "@txnlab/use-wallet-react";
import { AlgorandClient, Config } from "@algorandfoundation/algokit-utils";
import React, { useState, useEffect } from "react";
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

import MDInput from "../MDInput";
import translations from "./translations.json";

function EggsViewer() {
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
  const [eggs, setEggs] = useState([]);

  const turtleClient = new TurtleMonitorClient({
    algorand,
    appId: BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID),
    //appId: 1001n,
    defaultSender: activeAddress,
    defaultSigner: transactionSigner,
  });
  const parseEggData = (asaId, dataBlob) => {
    let eggData = {};

    eggData.id = asaId;

    const parsedBlob = Object.fromEntries(
      dataBlob // 1. stringa originale
        .split(";") // 2. ["latitude=23", "longitude=23", ... , ""]
        .filter(Boolean) // 3. rimuove l’ultima voce vuota
        .map((pair) => {
          const [key, raw] = pair.split("="); // 4. ["latitude", "23"]
          const value =
            key === "birthDate"
              ? formatItalianDateTime(new Date(raw)) // 5. parse ISO in Date
              : isNaN(raw)
              ? raw //    lascia stringhe non-numero
              : Number(raw); //    converte in numero
          return [key, value]; // 6. [["latitude", 23], ...]
        })
    );

    eggData = { ...eggData, ...parsedBlob };
    return eggData;
  };

  const getEggsBoxes = async () => {
    let eggs = await methods.get_turtles_ids(algorand, BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID));
    let eggsTableData = [];
    let eggsIds = Object.keys(eggs);
    eggsIds.map((asaId) => {
      let dataBlob = eggs[asaId];
      let itemData = parseEggData(asaId, dataBlob);
      eggsTableData.push(itemData);
    });
    setEggs(eggsTableData);
  };

  const getUserAuthority = async () => {
    setLoading(true);
    const is_smart_contract_creator: boolean = await methods.check_is_smart_contract_creator(
      algorand,
      activeAddress,
      BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID)
    );
    if (is_smart_contract_creator == true) {
      dispatchStore(setUserAuthorityScCreator());
    }
    setLoading(false);
  };

  useEffect(() => {
    // Esempio: fetch iniziale
    getUserAuthority();
    getEggsBoxes();
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

  return (
    <div className="turtle-administration-container">
      {activeAddress ? (
        <React.Fragment>
          <MDBox
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={2}
          >
            <h3>{t.boxHeading}</h3>
            <DataTable
              table={{
                columns: [
                  { Header: "ASA ID", accessor: "id", width: "25%" },
                  { Header: t.latitude, accessor: "latitude", width: "30%" },
                  { Header: t.longitude, accessor: "longitude" },
                  { Header: t.altitude, accessor: "altitude", width: "12%" },
                  { Header: t.birthDate, accessor: "birthDate", width: "12%" },
                ],
                rows: eggs,
              }}
            />
          </MDBox>
        </React.Fragment>
      ) : (
        <React.Fragment>Non sei connesso </React.Fragment>
      )}
    </div>
  );
}

export default EggsViewer;
