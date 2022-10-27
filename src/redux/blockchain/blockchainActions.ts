/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3EthContract from "web3-eth-contract";
// import Web3 from "web3";
// import store from "../store";
// import contrato_loteria from '../../abis/loteria.json'
// import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload: { account: any }) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload,
  };
};

const connectFailed = (payload: string) => {
  return {
    type: "CONNECTION_FAILED",
    payload,
  };
};

//conexion con metamask y la blockchain
export const connect = () => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      if (window?.ethereum) {
        // running on client and window + ethereum is avail
        dispatch(connectRequest());

        const { ethereum } = window;
        // console.log('ethereum:', ethereum)
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

        if (metamaskIsInstalled) {
          try {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log("Account:", accounts[0]);

            const networkId = await ethereum.request({
              method: "net_version",
            });
            // console.log('networkid:', networkId)

            // const networkData = contrato_loteria.networks[networkId]
            // console.log('NetworkData:', networkData)
            dispatch(
              connectSuccess({
                account: accounts[0],
                // web3: web3,
                // smartContract: SmartContractObj,
                // owner,
              })
            );
          } catch (err) {
            dispatch(connectFailed("Something went wrong."));
            console.log("Something went wrong");
          }
        } else {
          dispatch(connectFailed("Install Metamask."));
        }
      } else {
        // you are on the server.
        // OR user does not have a broswer wallet - i.e. metamask
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: blockchainActions.ts ~ line 107 ~ return ~ error",
        error
      );
    }

    // console.log( store.getState().blockchain.smartContract.methods)
  };
};
