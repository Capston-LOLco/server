import { pbkdf2Sync } from 'pbkdf2';
import { randomBytes } from 'crypto';

export class EncryptUtil {
  encrypt(password) {
    const salt: string = randomBytes(256).toString('base64');
    const hash: string = pbkdf2Sync(
      password,
      salt,
      2048,
      256,
      'sha512',
    ).toString('base64');
    return [hash, salt];
  }
}
