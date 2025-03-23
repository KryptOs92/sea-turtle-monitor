/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string

  readonly NEXT_PUBLIC_VITE_ALGOD_TOKEN: string
  readonly VITE_ALGOD_SERVER: string
  readonly NEXT_PUBLIC_VITE_ALGOD_PORT: string
  readonly NEXT_PUBLIC_VITE_ALGOD_NETWORK: string

  readonly NEXT_PUBLIC_VITE_INDEXER_TOKEN: string
  readonly NEXT_PUBLIC_VITE_INDEXER_SERVER: string
  readonly NEXT_PUBLIC_VITE_INDEXER_PORT: string

  readonly NEXT_PUBLIC_VITE_KMD_TOKEN: string
  readonly NEXT_PUBLIC_VITE_KMD_SERVER: string
  readonly NEXT_PUBLIC_VITE_KMD_PORT: string
  readonly NEXT_PUBLIC_VITE_KMD_PASSWORD: string
  readonly NEXT_PUBLIC_VITE_KMD_WALLET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
