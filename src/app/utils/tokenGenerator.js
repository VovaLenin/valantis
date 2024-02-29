import CryptoJS from "crypto-js";

const getXAuth = (PASSWORD) => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const xAuth = CryptoJS.MD5(`${PASSWORD}_${timestamp}`).toString();
  return xAuth;
};

export default getXAuth;
