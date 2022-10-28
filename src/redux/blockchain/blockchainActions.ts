// @ts-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import store from "../store";
import contratoNegocio from "../../abis/NegocioFidelizado.json";
import { fetchData } from "../data/dataActions";
import { ethers } from "ethers";

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
    // return async (dispatch) => {
    try {
      if (window?.ethereum) {
        // running on client and window + ethereum is avail
        dispatch(connectRequest());

        const { ethereum } = window;

        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        console.log(
          "🚀 ~ file: blockchainActions.ts ~ line 41 ~ //return ~ metamaskIsInstalled",
          metamaskIsInstalled
        );

        if (metamaskIsInstalled) {
          try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const accountCajero = await provider.send(
              "eth_requestAccounts",
              []
            );
            // const accountCajero = await ethereum.request({
            //   method: "eth_requestAccounts",
            // });
            // console.log("Account:", accountCajero[0]);

            const networkId = await ethereum.request({
              method: "net_version",
            });
            console.log("networkid:", networkId);

            const networkData = contratoNegocio.networks[networkId];
            console.log("NetworkData:", networkData);
            if (networkData) {
              const abi = contratoNegocio.abi;
              console.log("abi", abi);
              const address = networkData.address;
              console.log("address:", address);
              const smartContract = new ethers.Contract(address, abi, provider);

              dispatch(
                connectSuccess({
                  accountCajero,
                  smartContract,
                })
              );

              // Add listeners start
              // ethereum.on("accountsChanged", (accounts) => {
              //   dispatch(updateAccount(accounts[0]));
              // });

              //get Valor
              dispatch(fetchData());

              // ethereum.on("chainChanged", () => {
              //   window.location.reload();
              // });
              // Add listeners end
            } else {
              dispatch(connectFailed("Change network to BSC."));
              console.log("Change network to");
            }
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
