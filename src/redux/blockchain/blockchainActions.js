import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import store from "../store";
// import contrato_loteria from '../../abis/loteria.json'
// import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST", 
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload,
    
  };
};



//conexion con metamask y la blockchain
export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    
    const { ethereum } = window;
    // console.log('ethereum:', ethereum)
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    // console.log(metamaskIsInstalled)
    
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);//DUDA
      let web3 = new Web3(ethereum);
      // console.log('web3', web3)

      try {
        const accounts = await ethereum.request({ 
          method: "eth_requestAccounts",
          
        });
        console.log('Account:',accounts[0])
        
        const networkId = await ethereum.request({
          method: "net_version",
        });
        // console.log('networkid:', networkId)

        // const networkData = contrato_loteria.networks[networkId]
        // console.log('NetworkData:', networkData)

        if (networkData) {
          // const abi = contrato_loteria.abi
          // console.log('abi', abi)
          // const address = networkData.address
          // console.log('address:',address)
          // const SmartContractObj = new web3.eth.Contract(abi, address)
          // console.log('SmartContract:',SmartContractObj)
          //precio de los boletos
          // const owner = SmartContractObj.methods.owner()

          dispatch(
            connectSuccess({
              account: accounts[0],
              // web3: web3,
              // smartContract: SmartContractObj,
              // owner,
            })
          );

          // Add listeners start
          // ethereum.on("accountsChanged", (accounts) => {
          //   dispatch(updateAccount(accounts[0]));
          // });

          //get Valor
          // dispatch(fetchData())


          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to BSC."));
          console.log("Change network to")
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
        console.log("Something went wrong")
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
    // console.log( store.getState().blockchain.smartContract.methods)

  };
};