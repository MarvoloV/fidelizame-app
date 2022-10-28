// @ts-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import store from "../store";
import contratoNegocio from "../../abis/NegocioFidelizado.json";
import { fetchData } from "../data/dataActions";

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
        // console.log('ethereum:', ethereum)
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        

        if (metamaskIsInstalled) {

          

          try {
            const accountCajero = await ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log("Account:", accountCajero[0]);

            const networkId = await ethereum.request({
              method: "net_version",
            });
            console.log('networkid:', networkId)

            const networkData = contratoNegocio.networks[networkId];
            console.log('NetworkData:', networkData)
            if (networkData) {
              // @ts-ignore
              const abi = contratoNegocio.abi;
              console.log('abi', abi)
              const address = networkData.address;
              console.log("address:", address);
              
              
              Web3EthContract.setProvider(ethereum);//DUDA
              const web3 = new Web3(ethereum);
              console.log('web3', web3);


              const smartContract = new web3.eth.Contract(abi, address);
              console.log("SmartContract:", smartContract);
              //precio de los boletos
              // const owner = SmartContractObj.methods.owner()

              dispatch(
                connectSuccess({
                  accountCajero,
                  accountUser,
                  smartContract
                  // web3: web3,
                  // owner,
                })
              );

              // Add listeners start
              // ethereum.on("accountsChanged", (accounts) => {
              //   dispatch(updateAccount(accounts[0]));
              // });

              //get Valor
              dispatch(fetchData());

              ethereum.on("chainChanged", () => {
                window.location.reload();
              });
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
