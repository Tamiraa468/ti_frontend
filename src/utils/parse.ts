import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

const passphrase = "medorderpassphrase";

export const encryptWithAES = (text: string): string =>
  AES.encrypt(text, passphrase).toString();

export const decryptWithAES = (ciphertext: string): string => {
  const bytes = AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(Utf8);
  return originalText;
};
