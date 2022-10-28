// @ts-ignore
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      // console.log(store.getState().blockchain.account) 
      // const tokensContract = await store.getState().blockchain.smartContract.methods.TokensDisponibles().call();
      const tokensCajero = await store.getState().blockchain.smartContract.methods.balanceOf(store.getState().blockchain.accountCajero).call();
      const tokensUser = await store.getState().blockchain.smartContract.methods.balanceOf(store.getState().blockchain.accountUser).call();
      // const numDeBoletos = await store.getState().blockchain.smartContract.methods.NumDeBoletos(store.getState().blockchain.account).call();
      // const bote = await store.getState().blockchain.smartContract.methods.Bote().call();
      // const ganador = await store.getState().blockchain.smartContract.methods.direccion_ganador().call();
      // const owner = await store.getState().blockchain.smartContract.methods.owner().call();
      // // await console.log(owner)
      // await console.log(misTokens)
      // console.log(misBoletos)
      // console.log( store.getState().blockchain.smartContract.methods)
      
      dispatch(
        fetchDataSuccess({
          tokensCajero,
          tokensUser
          // numDeBoletos,
          // bote,
          // ganador,
          // owner,
        })

      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
