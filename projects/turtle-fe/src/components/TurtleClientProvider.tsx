// context/TurtleClientProvider.tsx
"use client";

import { createContext, useContext, useRef } from "react";
import { useWallet } from "@txnlab/use-wallet-react";
import { TurtleMonitorClient } from "../contracts/TurtleMonitor";
import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from "../utils/network/getAlgoClientConfigs";

// 1. context
const TurtleClientContext = createContext<TurtleMonitorClient | null>(null);

// 2. provider
interface Props {
  children: React.ReactNode;
}
export default function TurtleClientProvider({ children }: Props) {
  const algodConfig = getAlgodConfigFromViteEnvironment();

  const clientRef = useRef<TurtleMonitorClient | null>(null);

  const { activeAddress, transactionSigner } = useWallet();
  const algorand = AlgorandClient.fromConfig({ algodConfig });
  algorand.setDefaultSigner(transactionSigner);
  const turtleClient = new TurtleMonitorClient({
    algorand,
    appId: BigInt(process.env.NEXT_PUBLIC_TURTLE_APPID),
    //appId: 1001n,
    defaultSender: activeAddress,
    defaultSigner: transactionSigner,
  });
  if (!clientRef.current) {
    clientRef.current = turtleClient;
  }

  return <TurtleClientContext.Provider value={clientRef.current}>{children}</TurtleClientContext.Provider>;
}

export function useTurtleClient() {
  const ctx = useContext(TurtleClientContext);
  if (!ctx) throw new Error("useTurtleClient deve essere usato nel TurtleClientProvider");
  return ctx;
}
