import { useWallet, Wallet, WalletId } from "@txnlab/use-wallet-react";
import { AlgorandClient, Config } from "@algorandfoundation/algokit-utils";
import React, { useState, useEffect } from "react";
import MethodCall from "../MethodCall";
import * as methods from "../../methods";
import { getAlgodConfigFromViteEnvironment } from "../../utils/network/getAlgoClientConfigs";
import { TurtleMonitorClient } from "../../contracts/TurtleMonitor";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthorityScCreator } from "../../lib/turtleSCslice";

function TurtleAdministration() {
  const [appId, setAppId] = useState(1001);
  const [loading, setLoading] = useState(false);

  const dispatchStore = useDispatch();
  const { activeAddress } = useWallet();
  const algodConfig = getAlgodConfigFromViteEnvironment();
  const user_authority = useSelector((state) => state.turtleSC.user_authority);
  const [isAdmin, setIsAdmin] = useState(false);
  const algorand = AlgorandClient.fromConfig({ algodConfig });

  const turtleClient = new TurtleMonitorClient({
    algorand,
    appId: 1001n,
  });

  const getUserAuthority = async () => {
    setLoading(true);
    const is_smart_contract_creator: boolean = await methods.check_is_smart_contract_creator(algorand, activeAddress, 1001);
    console.log("RRRR ", is_smart_contract_creator);
    if (is_smart_contract_creator == true) {
      dispatchStore(setUserAuthorityScCreator());
    }
    setLoading(false);
  };

  useEffect(() => {
    // Esempio: fetch iniziale
    getUserAuthority();

    // return simile a componentWillUnmount
    return () => {
      // Pulizie: rimuovere event listeners, timer, ecc.
    };
  }, []);

  return (
    <div className="turtle-administration-container">
      ciao
      {activeAddress ? (
        <div>
          {activeAddress}
          {loading ? <span className="loading loading-spinner" /> : user_authority}

          {/* <MethodCall methodFunction={() => methods.check_is_creator(algorand, activeAddress, 1001)} text="TEST" /> */}
        </div>
      ) : (
        <div>Non sei connesso</div>
      )}
    </div>
  );
}

export default TurtleAdministration;
