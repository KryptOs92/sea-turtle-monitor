import { useWallet, Wallet, WalletId } from "@txnlab/use-wallet-react";
import { AlgorandClient, Config } from "@algorandfoundation/algokit-utils";
import React, { useState, useEffect } from "react";
import TurtleCreation from "../TurtleCreation";
import EggsViewer from "../EggsViewer";
import TurtleCreatorsViewer from "../TurtleCreatorsViewer";
import MethodCall from "../MethodCall";
import * as methods from "../../methods";
import { getAlgodConfigFromViteEnvironment } from "../../utils/network/getAlgoClientConfigs";
import { TurtleMonitorClient } from "../../contracts/TurtleMonitor";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthorityScCreator } from "../../lib/turtleSCslice";
import MDButton from "../MDButton";
import MDInput from "../MDInput";

function TurtleAdministration() {
  const [appId, setAppId] = useState(BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID));
  const [loading, setLoading] = useState(false);
  const [turtleCreators, setTurtleCreators] = useState([]);
  const dispatchStore = useDispatch();
  const { activeAddress, transactionSigner } = useWallet();
  const algodConfig = getAlgodConfigFromViteEnvironment();
  const user_authority = useSelector((state) => state.turtleSC.user_authority);
  const [isAdmin, setIsAdmin] = useState(false);
  const algorand = AlgorandClient.fromConfig({ algodConfig });
  algorand.setDefaultSigner(transactionSigner);
  const [mounted, setMounted] = React.useState(false);
  const [newCreatorAddress, setNewCreatorAddress] = useState("");

  const turtleClient = new TurtleMonitorClient({
    algorand,
    appId: BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID),
    //appId: 1001n,
    defaultSender: activeAddress,
    defaultSigner: transactionSigner,
  });



  const addCreator = async () => {
    const is_smart_contract_creator: boolean = await methods.check_is_smart_contract_creator(
      algorand,
      newCreatorAddress,
      BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID)
    );
    if (!is_smart_contract_creator) {
      let res = await methods.addCreator(turtleClient, newCreatorAddress);
    }
  };

  const getTurtleCreators = async () => {
    await methods.get_turtle_creators(algorand, BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID));
  };

  useEffect(() => {
    // Esempio: fetch iniziale
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
          {activeAddress}
          <br /> <br />
          {loading ? <span className="loading loading-spinner" /> : user_authority}
          <br /> <br />
          {user_authority === "sc_creator" ? (
            <div>
              <MDInput
                variant="outlined"
                fullWidth
                value={newCreatorAddress}
                onChange={(event) => setNewCreatorAddress(event.target.value)}
              />
              <MDButton onClick={addCreator}>AGGIUNGI CREATOR</MDButton>
            </div>
          ) : null}
          <br /> <br />
          {/*           <MDButton onClick={getTurtleCreators}>GET CREATOR</MDButton>
           */}{" "}
          <TurtleCreatorsViewer />
          <br /> <br />
          <TurtleCreation />
          <br /> <br />
          <EggsViewer />
          {/* <MethodCall methodFunction={() => methods.check_is_creator(algorand, activeAddress, 1001)} text="TEST" /> */}
        </React.Fragment>
      ) : (
        <React.Fragment>Non sei connesso </React.Fragment>
      )}
    </div>
  );
}

export default TurtleAdministration;
