

- metamask
- hardhat
- reactjs
- tailwind css
- solidity
- ethersjs
- flare 
- flock

## running the demo

to run the demo follow these steps:

1. clone the project with the code below.

   ```sh

   # make sure you have the above prerequisites installed already!
   git clone https://github.com/daltonic/oraclevoted
   cd dappyvote # navigate to the new folder.
   yarn install # installs all the dependencies.
   ```

2. create a cometchat project, copy and paste your key in the spaces below.
3. update the `.env` file with the following details.
   ```sh
    next_public_comet_chat_app_id=<cometchat_app_id>
    next_public_comet_chat_auth_key=<comet_chat_auth_key>
    next_public_comet_chat_region=<cometchat_region>
    next_app_rpc_url=<http://127.0.0.1:8545>
   ```
4. run the app using the following commands.
   ```sh
   yarn install
   yarn hardhat node
   yarn hardhat run scripts/deploy.js
   ```
5. on another terminal, run `yarn start` to launch the project on the browser.

   <br/>

