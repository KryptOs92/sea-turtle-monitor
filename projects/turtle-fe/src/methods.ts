import * as algokit from "@algorandfoundation/algokit-utils";
import { TurtleMonitorClient } from "./contracts/TurtleMonitor";
import { encodeAddress, decodeAddress, decodeUint64, encodeUint64 } from "algosdk";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";

/**
 * Create the application and opt it into the desired asset
 */
export function create(algorand: algokit.AlgorandClient, tmClient, sender: string, setAppId: (id: number) => void) {
  return async () => {
    const createResult = await tmClient.send.create.bare();

    await algorand.send.payment({
      sender,
      receiver: createResult.appAddress,
      amount: algokit.algos(0.1),
    });

    setAppId(Number(createResult.appId));
  };
}

export async function is_creator(tmClient: TurtleMonitorClient, address: string, sender: string) {
  // tipicamente: appId e sender devono essere passati come "params" all'ABIMethod
  // In Algokit i metodi ABI generati hanno la firma di default, es:
  //   tmClient.add_creator(args..., { sender, appId, ... })
  /*   const result = await tmClient.send.isCreatorAddr({ args: { checkAddr: address } });

  const boolVal = result;
  console.log("isCreator?", boolVal); */
}

export async function check_is_smart_contract_creator(algorand: algokit.AlgorandClient, address: string | null, appId): Promise<boolean> {
  if (!address || !appId) {
    return false;
  }
  //OTTENGO RIFERIMENTO DELL APP ALGOKIT
  const app = await algorand.app.getById(appId);

  //OTTENGO ADDRESS ENCODATO DEL CREATORE DEL CONTRATTO
  const smart_contract_creator_address = encodeAddress(app.creator.publicKey);

  return smart_contract_creator_address === address;
}

export async function get_turtle_creators(algorand: algokit.AlgorandClient, appId) {
  let boxNames = await algorand.app.getBoxNames(appId);
  let creatorBoxes = {};
  boxNames.map(async (name) => {
    const boxName = Buffer.from(name.name);

    if (boxName.toString().startsWith("creator:")) {
      /* LA CHIAVE DI TUTTE LE BOX ESSENDO creator:byteAddress avranno i primi 8 bytes che servono per la stringa 'creator:' e i successivi 32 per l address salvato */
      const rawName = name.nameRaw;
      const addrBytes = rawName.slice(8, 40); // i 32 byte
      const creatorAddress = encodeAddress(addrBytes);

      /* IN QUESTO CASO il valore mi torna '49' che in ASCII EQUIVALE A 1, infatti io quando salvo un creator metto il valore a 1. In realta dato che quando lo cancello rimuovo la box e non setto a 0 è superfluo andare a
      controllare che il valore sia 1, tanto o c'è o non c'è l address */
      let boxValue = await algorand.app.getBoxValue(appId, name);
      let creatorValue = new TextDecoder().decode(boxValue);
      creatorBoxes[creatorAddress] = creatorValue;
    }
  });
  return creatorBoxes;
}

export async function get_turtles_ids(algorand: algokit.AlgorandClient, appId) {
  let boxNames = await algorand.app.getBoxNames(appId);
  var eggsBoxes = {};

  await Promise.all(
    boxNames.map(async (name) => {
      const boxName = Buffer.from(name.name);

      if (boxName.toString().startsWith("egg:")) {
        /* LA CHIAVE DI TUTTE LE BOX ESSENDO creator:byteAddress avranno i primi 4 bytes che servono per la stringa 'egg:' e i successivi 8 per l asa id */
        const rawName = name.nameRaw;
        const asaIdBytes = rawName.slice(4, 12);
        const asaId = decodeUint64(asaIdBytes);

        /* IN QUESTO CASO il valore mi torna '49' che in ASCII EQUIVALE A 1, infatti io quando salvo un creator metto il valore a 1. In realta dato che quando lo cancello rimuovo la box e non setto a 0 è superfluo andare a
      controllare che il valore sia 1, tanto o c'è o non c'è l address */
        let boxValue = await algorand.app.getBoxValue(appId, name);
        let eggBoxValue = new TextDecoder().decode(boxValue);

        eggsBoxes[asaId] = eggBoxValue;
      }
    })
  );

  return eggsBoxes;
}

export async function addCreator(
  tmClient: TurtleMonitorClient,

  newCreator: string // Indirizzo base32,
) {
  await tmClient.send.addCreator({
    args: { newCreator: newCreator },
    populateAppCallResources: true,
  });
}

export async function createEggNft(tmClient: TurtleMonitorClient, name: string, url: string, dataBlob: string): Promise<number> {
  // Chiamiamo il metodo "create_egg_nft"
  const result = await tmClient.send.createEggNft({
    args: { name: name, url: url, dataBlob: dataBlob },
    populateAppCallResources: true,
    coverAppCallInnerTransactionFees: true,
    maxFee: new AlgoAmount({ microAlgos: 5_000 }),
  });
  // result return_value conterrà l'ASA ID creato
  const createdAsaId = Number(result.return);
  return createdAsaId;
}

export async function updateEggData(
  algorand: algokit.AlgorandClient,
  appId: number,
  tmClient: TurtleMonitor,
  sender: string,
  asaId: number,
  newUrl: string,
  dataBlob: string
) {
  // Chiamiamo il metodo "update_egg_data"
  await tmClient.update_egg_data(
    {
      asa_id: asaId,
      new_url: newUrl,
      data_blob: dataBlob,
    },
    {
      sender,
      appId,
    }
  );
}
