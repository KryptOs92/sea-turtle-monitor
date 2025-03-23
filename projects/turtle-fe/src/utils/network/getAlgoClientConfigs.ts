import { AlgoViteClientConfig, AlgoViteKMDConfig } from '../../interfaces/network'

export function getAlgodConfigFromViteEnvironment(): AlgoViteClientConfig {
  if (!process.env.NEXT_PUBLIC_VITE_ALGOD_SERVER) {
    throw new Error('Attempt to get default algod configuration without specifying VITE_ALGOD_SERVER in the environment variables')
  }

  return {
    server: process.env.NEXT_PUBLIC_VITE_ALGOD_SERVER,
    port: String(process.env.NEXT_PUBLIC_VITE_ALGOD_PORT),
    token: String(process.env.NEXT_PUBLIC_VITE_ALGOD_TOKEN),
    network: String(process.env.NEXT_PUBLIC_VITE_ALGOD_NETWORK),
  }
}

export function getIndexerConfigFromViteEnvironment(): AlgoViteClientConfig {
  if (!process.env.NEXT_PUBLIC_VITE_INDEXER_SERVER) {
    throw new Error('Attempt to get default algod configuration without specifying NEXT_PUBLIC_VITE_INDEXER_SERVER in the environment variables')
  }

  return {
    server: process.env.NEXT_PUBLIC_VITE_INDEXER_SERVER,
    port: String(process.env.NEXT_PUBLIC_VITE_INDEXER_PORT),
    token: String(process.env.NEXT_PUBLIC_VITE_INDEXER_TOKEN),
    network: String(process.env.NEXT_PUBLIC_VITE_ALGOD_NETWORK),
  }
}

export function getKmdConfigFromViteEnvironment(): AlgoViteKMDConfig {
  if (!process.env.NEXT_PUBLIC_VITE_KMD_SERVER) {
    throw new Error('Attempt to get default kmd configuration without specifying NEXT_PUBLIC_VITE_KMD_SERVER in the environment variables')
  }

  return {
    server: String(process.env.NEXT_PUBLIC_VITE_KMD_SERVER),
    port: String(process.env.NEXT_PUBLIC_VITE_KMD_PORT),
    token: String(process.env.NEXT_PUBLIC_VITE_KMD_TOKEN),
    wallet: String(process.env.NEXT_PUBLIC_VITE_KMD_WALLET),
    password: String(process.env.NEXT_PUBLIC_VITE_KMD_PASSWORD),
  }
}
