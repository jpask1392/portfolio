import { useConnect } from 'wagmi'
import Button from "@/components/ui/Button";
import cn from 'classnames';
import toast, { Toaster, toaster } from "react-hot-toast";
import { useEffect } from 'react';

const WagmiConnectButton = () => {
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect();

  useEffect(() => {
    console.log(error)
    if (error) toast.error(error.message);
  }, [error])

  return (
    <>
      {/* <Toaster position='bottom-center'/> */}

      { activeConnector && <div>Connected to {activeConnector.name}</div> }

      <Button 
        text={isConnecting ? ' (connecting)' : "Connect"}
        onClick={() => connect(activeConnector)}
      />

      {/* {connectors.map((x) => (
        <button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
          {x.name}
          {isConnecting && pendingConnector?.id === x.id && ' (connecting)'}
        </button>
      ))} */}
    </>
  );
};

export default WagmiConnectButton;