import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
// import { getDefaultProvider } from 'ethers'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider: provider,
  webSocketProvider
})

export function WagmiContextProvider({ children } : { children: any }) {
  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  );
}
