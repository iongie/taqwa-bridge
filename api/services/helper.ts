import * as crypto from 'crypto';

function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_=+|;:?';

  const randomString = Array.from({ length }, () => {
    const randomIndex = crypto.randomInt(characters.length);
    return characters.charAt(randomIndex);
  }).join('');

  return randomString;
}

function encrypt(algorithm:string, data:string, key: Buffer, iv: Buffer) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        "key": key.toString('hex'),
        "iv": iv.toString('hex'),
        "encryptedData": encrypted.toString('hex')
    }
}

function decrypt(algorithm: string, encryptedData: string, key: string, iv: string) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString()
}

export {
  generateRandomString,
  encrypt,
  decrypt
}
