import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "@/components/ui/Button";
import cn from 'classnames';

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div className={cn({
            "sr-only" : !mounted
          })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button 
                    onClick={openConnectModal}
                    text="Connect Wallet"
                  />
                );
              }

              if (chain.unsupported) {
                return (
                  <Button 
                    text="Wrong network"
                    onClick={openChainModal}
                  />
                );
              }

              return (
                <div className="flex gap-3">
                  <Button 
                    text={account.displayName}
                    onClick={openAccountModal}
                  />
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;