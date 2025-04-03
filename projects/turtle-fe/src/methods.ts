import * as algokit from "@algorandfoundation/algokit-utils";
import { TurtleMonitorClient } from "./contracts/TurtleMonitor";
import { encodeAddress } from "algosdk";

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

export async function check_is_creator(algorand: algokit.AlgorandClient, address: string, appId) {
  //OTTENGO RIFERIMENTO DELL APP ALGOKIT
  const app = await algorand.app.getById(appId);

  //OTTENDO ADDRESS ENCODATO DEL CREATORE DEL CONTRATTO
  const smart_contract_creator_address = encodeAddress(app.creator.publicKey);

  //const names = await algorand.app.getBoxNames(appId);
  //console.log("NAMES ", names);
  console.log("APP ", encodeAddress(app.creator.publicKey) === address);
}

export async function addCreator(
  algorand: algokit.AlgorandClient,
  appId: number,
  tmClient: TurtleMonitor,
  sender: string,
  newCreator: string // Indirizzo base32
) {
  // tipicamente: appId e sender devono essere passati come "params" all'ABIMethod
  // In Algokit i metodi ABI generati hanno la firma di default, es:
  //   tmClient.add_creator(args..., { sender, appId, ... })
  await tmClient.add_creator(
    { new_creator: newCreator }, // Argomenti ABI
    {
      sender,
      appId, // Indichiamo su quale App ID chiamare
    }
  );
}

export async function createEggNft(
  algorand: algokit.AlgorandClient,
  appId: number,
  tmClient: TurtleMonitor,
  sender: string,
  name: string,
  url: string,
  dataBlob: string
): Promise<number> {
  // Chiamiamo il metodo "create_egg_nft"
  const result = await tmClient.create_egg_nft(
    {
      name,
      url,
      data_blob: dataBlob,
    },
    {
      sender,
      appId,
    }
  );
  // result return_value conterrà l'ASA ID creato
  const createdAsaId = Number(result.returnValue);
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
