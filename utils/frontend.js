let NETWORK = "rinkeby";
import waitlist from "../lists/waitlistAddresses.json";
import allowlist from "../lists/allowlistAddresses.json";
import claimlist from "../lists/claimlistAddresses.json";

export function getTruncatedAddress(address) {
  if (address && address.startsWith("0x")) {
    return address.substr(0, 5) + "..." + address.substr(address.length - 4);
  }
  return address;
}

export const etherscanNetworkString =
  NETWORK.toLowerCase() == "ethereum" ? "" : `${NETWORK}.`;

export function getNetwork(chainId) {
  switch (chainId) {
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 5:
      return "Goerli";
    case 42:
      return "Kovan";
    default:
      return `unknown network ${chainId}`;
  }
}

export function debug(varObj) {
  Object.keys(varObj).forEach((str) => {
    console.log(`${str}:`, varObj[str]);
  });
}

export function getWaitlist(inputAddr) {
  const inWaitlist = waitlist.some(
    (el) => el.toLowerCase() === inputAddr.toLowerCase()
  );
  return inWaitlist;
}

export function getAllowlist(inputAddr) {
  const inAllowlist = allowlist.some(
    (el) => el.toLowerCase() === inputAddr.toLowerCase()
  );
  return inAllowlist;
}

export function getClaimlist(inputAddr) {
  const inClaimlist = claimlist.some(
    (el) => el.toLowerCase() === inputAddr.toLowerCase()
  );
  return inClaimlist;
}
