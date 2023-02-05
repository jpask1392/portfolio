import ConnectWalletButton from "./ConnectWalletButton";
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useState, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";

const WithSigner = ({
  onSuccess
}) => {
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();

  const [ state, setState ] = useState({});
  const { signMessageAsync } = useSignMessage();

  const signIn = useCallback(async () => {
    try {
      const address = accountData?.address
      const chainId = activeChain?.id

      if (!address || !chainId) return;

      setState((x) => ({ ...x, error: undefined, loading: true }))
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch('/api/nonce');

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await nonceRes.text(),
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })


      // Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })

      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, address, loading: false }))
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false }))
    }
  }, [state, accountData])

  useEffect(() => {
    onSuccess(state)
  }, [state])

  if (accountData) {
    return (
      <div>
        {/* Account content goes here */}

        {state.address ? (
          <div>
            <div>Signed in as: <br/><span className="mt-2 py-2 px-4 bg-lightBlue rounded-md block font-bold">{state.address}</span></div>
            <div className="mt-4">
              <Button
                text="Sign Out"
                onClick={async () => {
                  await fetch('/api/logout')
                  setState({})
                }}
              />
            </div>
          </div>
        ) : (
          <Button 
            text="Sign-In with Ethereum"
            onClick={signIn}
            loading={state.loading}
          />
        )}
      </div>
    )
  } 
    
  return <div><ConnectWalletButton /></div>

}

export default WithSigner;
