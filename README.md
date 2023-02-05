## How to use

- `git clone` the repo
- run `npm install`
- run `npm run dev`
- Push to main to see on Vercel

## Docs

- [Figma file](https://www.figma.com/file/Pl4EVLaIU1wtv8izvxB90p/Collective-Strangers-Website-Design?node-id=50%3A107)
- [Vercel Preview](https://website-mvuc37jhl-collective-strangers.vercel.app/)

## How to run tests

`npx hardhat test`

## How to deploy

To deploy the contract to the test net, make sure that to update `hardhat.config.js` to have the private key of the wallet you'd like to deploy from, and an Infura project ID.

You will also need to add the contract to the allowlist in the security settings for the project within Infura.

Once all that is set up, you can run the following command to deploy to the Rinkeby test network:
`npx hardhat run scripts/deploy.js --network rinkeby`

## How to verify the contract

Once the contract is deployed, you can also verify the contract. First, add the contract address to the allowlist in the security setting for the project in Infura.

Then run the following command:
`npx hardhat verify --network rinkeby --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS`
`npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS https://csone.free.beeceptor.com`

1. Deploy contract
1. Set image URI
1. Set animation URI
1. Update claim merkle root
1. Set isClaimActive to true
1. Update community sale merkle root
1. Set community sale active to true
1. Set community sale active to false
1. Update community sale merkle root to the waitlist merkle root
1. Set wait list sale active to true
