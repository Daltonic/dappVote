# How to Build a Web3 Play-To-Earn Money Dapp with React, Solidity, and CometChat

Read the full tutorial here: [**>> How to Build a Web3 Play-To-Earn Dapp with React, Solidity, and CometChat**](https://daltonic.github.io)

This example shows How to Build a Web3 Play-To-Earn Dapp with React, Solidity, and CometChat:

![Game Play](./screenshots/0.gif)

<center><figcaption>Game Play to Earn</figcaption></center>

![Result and Payout](./screenshots/1.gif)

<center><figcaption>Result and Payout</figcaption></center>

![Play to Earn Live Chat](./screenshots/3.gif)

<center><figcaption>Play to Earn Live</figcaption></center>

## Technology

This demo uses:

- Metamask
- Hardhat
- Infuria
- ReactJs
- Tailwind CSS
- Solidity
- EthersJs
- Faucet

## Running the demo

To run the demo follow these steps:

1. Clone the project with the code below.

   ```sh

   # Make sure you have the above prerequisites installed already!
   git clone https://github.com/Daltonic/P2E PROJECT_NAME
   cd PROJECT_NAME # Navigate to the new folder.
   yarn install # Installs all the dependencies.
   ```

2. Create a CometChat project, copy and paste your key in the spaces below.
3. Update the `.env` file with the following details.
   ```sh
    REACT_APP_COMET_CHAT_APP_ID=<CometChat_APP_ID>
    REACT_APP_COMET_CHAT_AUTH_KEY=<Comet_Chat_AUTH_KEY>
    REACT_APP_COMET_CHAT_REGION=<CometChat_REGION>
    REACT_APP_RPC_URL=<http://127.0.0.1:8545>
   ```
4. Run the app using the following commands.
   ```sh
   yarn install
   yarn hardhat node
   yarn hardhat run scripts/deploy.js
   ```
5. On another terminal, run `yarn start` to launch the project on the browser.
6. Add some hardhat accounts, connect your wallet and interact with the app.
   <br/>

If your confuse about the installation, check out this **TUTORIAL** to see how you should run it.

Questions about running the demo? [Open an issue](https://github.com/Daltonic/P2E/issues). We're here to help ✌️
Access the [Teaching Guide Here](https://docs.google.com/document/d/13bBRyAO0bEwRt776FXbYgWm6-OBFiUu6zTeOgRbXXyI/edit?usp=sharing).

## Useful links

- 🏠 [Website](https://dappmentors.org/)
- ⚽ [Metamask](https://metamask.io/)
<!-- - 🚀 [CometChat](https://try.cometchat.com/oj0s7hrm5v78) -->
- 💡 [Hardhat](https://hardhat.org/)
- 📈 [Infuria](https://infura.io/)
- 🔥 [NextJs](https://nextjs.org/)
- 🎅 [TypeScript](https://www.typescriptlang.org/)
- 🐻 [Solidity](https://soliditylang.org/)
- 👀 [EthersJs](https://docs.ethers.io/v5/)
<!-- - ✨ [Live Demo](https://play-to-earn-three.vercel.app/) -->
