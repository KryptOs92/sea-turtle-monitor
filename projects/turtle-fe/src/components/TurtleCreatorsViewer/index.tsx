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

function TurtleCreatorsViewer() {
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
  const [creators, setCreators] = useState([]);

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

  const getCreatorsBoxes = async () => {
    let creators = await methods.get_turtle_creators(algorand, BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID));
    let creatorsData = [];
    let creatorsAddress = Object.keys(creators);
    creatorsAddress.map((addr) => {
      if (creators[addr] == "1") {
        creatorsData.push({ address: addr });
      }
    });
    setCreators(creatorsData);
    console.log("CREATORSSS ", creatorsData);
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
    getCreatorsBoxes();
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
            {
              <DataTable
                table={{
                  columns: [{ Header: "Address", accessor: "address", width: "100%" }],
                  rows: creators,
                }}
              />
            }
          </MDBox>
        </React.Fragment>
      ) : (
        <React.Fragment>Non sei connesso </React.Fragment>
      )}
    </div>
  );
}

export default TurtleCreatorsViewer;
