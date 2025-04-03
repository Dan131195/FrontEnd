import store from "../Redux/store";

export const getToken = () => {
  const state = store.getState();
  const tokenFromRedux = state.auth?.token;

  if (tokenFromRedux) return tokenFromRedux;

  const tokenFromStorage = localStorage.getItem("token");
  console.log(tokenFromStorage);
  return tokenFromStorage || null;
};
