import * as CryptoJS from 'crypto-js';

export const decryptData = (content: string, key: string): string => {
    if (!content || !key) return '';
    const bytes = CryptoJS.AES.decrypt(content, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};