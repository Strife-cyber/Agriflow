import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY || "";

export const encryptData = (data: object): string => {
    const stringifiedData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string): object | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};
