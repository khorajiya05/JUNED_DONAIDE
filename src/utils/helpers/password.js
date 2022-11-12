import CryptoJS from "crypto-js";

export const setWithExpiry = async (key, password, email) => {

  const encryptPassword = await CryptoJS.AES.encrypt(password, key).toString();

  const item = {
    email: email,
    password: encryptPassword,
  };
  localStorage.setItem("rememberMe", JSON.stringify(item));
};


export const getWithExpiry = (key) => {

  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  const decryptPassword = CryptoJS.AES.decrypt(item.password, "encPass");
  const originalPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

  return {
    email: item.email,
    password: originalPassword,
  };
};
