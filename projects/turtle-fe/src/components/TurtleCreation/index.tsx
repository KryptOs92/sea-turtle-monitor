import { useWallet, Wallet, WalletId } from "@txnlab/use-wallet-react";
import { AlgorandClient, Config } from "@algorandfoundation/algokit-utils";
import React, { useState, useEffect } from "react";
import MethodCall from "../MethodCall";
import * as methods from "../../methods";
import { getAlgodConfigFromViteEnvironment } from "../../utils/network/getAlgoClientConfigs";
import { TurtleMonitorClient } from "../../contracts/TurtleMonitor";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthorityScCreator } from "../../lib/turtleSCslice";
import MDBox from "../MDBox";
import MDButton from "../MDButton";

import MDInput from "../MDInput";
import translations from "./translations.json";

function TurtleCreation() {
  const [appId, setAppId] = useState(BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID));
  const [loading, setLoading] = useState(false);
  const [turtleCreators, setTurtleCreators] = useState([]);
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

  const [name, setName] = useState("");
  const [nameIsOk, setNameIsOk] = useState(null);

  const [latitude, setLatitude] = useState("");
  const [latitudeIsOk, setLatitudeIsOk] = useState(null);

  const [longitude, setLongitude] = useState("");
  const [longitudeIsOk, setLongitudeIsOk] = useState(null);

  const [satellites, setSatellites] = useState("");
  const [satellitesIsOk, setSatellitesIsOk] = useState(null);

  const [birthDate, setBirthDate] = useState("");
  const [birthdateIsOK, setBirthDateIsOK] = useState(null);

  const [birthTime, setBirtTime] = useState("");
  const [birthTimeIsOk, setBirthTimeIsOk] = useState(null);

  const [altitude, setAltitude] = useState("");
  const [altitudeIsOk, setAltitudeIsOk] = useState(null);

  const turtleClient = new TurtleMonitorClient({
    algorand,
    appId: BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID),
    //appId: 1001n,
    defaultSender: activeAddress,
    defaultSigner: transactionSigner,
  });

  const createTurtleNft = async () => {
    let dataBlob = "";
    let url = "";
    let areInputsOk = true;
    if (name.length > 0) {
      setNameIsOk(true);
    } else {
      areInputsOk = false;
      setNameIsOk(false);
    }
    if (latitude.length > 0) {
      setLatitudeIsOk(true);
      dataBlob = dataBlob + "latitude=" + latitude + ";";
    } else {
      areInputsOk = false;
      setLatitudeIsOk(false);
    }
    if (longitude.length > 0) {
      setLongitudeIsOk(true);
      dataBlob = dataBlob + "longitude=" + longitude + ";";
    } else {
      areInputsOk = false;
      setLongitudeIsOk(false);
    }
    if (altitude.length > 0) {
      setAltitudeIsOk(true);
      dataBlob = dataBlob + "altitude=" + altitude + ";";
    } else {
      areInputsOk = false;
      setAltitudeIsOk(false);
    }
    if (birthDate.length > 0 && birthTime.length > 0) {
      setBirthDateIsOK(true);
      setBirthTimeIsOk(true);
      let bDate = new Date(birthDate + "T" + birthTime + ":00");
      let utcString = bDate.toISOString();
      dataBlob = dataBlob + "birthDate=" + utcString + ";";
    } else {
      areInputsOk = false;
      birthDate.length === 0 ? setBirthDateIsOK(false) : null;
      birthTime.length === 0 ? setBirthTimeIsOk(false) : null;
    }

    if (areInputsOk) {
      let res = await methods.createEggNft(turtleClient, name, url, dataBlob);
    }
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
          <MDBox
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={2}
          >
            <h3>{t.boxHeading}</h3>
            <MDInput
              type="text"
              label={t.name}
              value={name}
              onChange={(event) => setName(event.target.value)}
              success={nameIsOk === true}
              error={nameIsOk === false}
            />
            <MDInput
              type="number"
              label={t.latitude}
              value={latitude}
              success={latitudeIsOk === true}
              error={latitudeIsOk === false}
              onChange={(event) => setLatitude(event.target.value)}
            />
            <MDInput
              type="number"
              label={t.longitude}
              value={longitude}
              success={longitudeIsOk === true}
              error={longitudeIsOk === false}
              onChange={(event) => setLongitude(event.target.value)}
            />
            <MDInput
              type="number"
              label={t.altitude}
              value={altitude}
              success={altitudeIsOk === true}
              error={altitudeIsOk === false}
              onChange={(event) => setAltitude(event.target.value)}
            />
            <div>
              <MDInput
                type="date"
                default=""
                success={birthdateIsOK === true}
                error={birthdateIsOK === false}
                label={t.birthDate}
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
              />
              <MDInput
                sx={{ minWidth: "150px" }}
                type="time"
                label={t.birthTime}
                success={birthTimeIsOk === true}
                error={birthTimeIsOk === false}
                value={birthTime}
                onChange={(event) => setBirtTime(event.target.value)}
              />
            </div>
            <MDButton onClick={createTurtleNft} sx={{ width: "150px" }}>
              {t.createNFT}
            </MDButton>
          </MDBox>
        </React.Fragment>
      ) : (
        <React.Fragment>Non sei connesso </React.Fragment>
      )}
    </div>
  );
}

export default TurtleCreation;
