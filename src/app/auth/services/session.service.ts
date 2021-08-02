import { Injectable } from '@angular/core';
import { UserModel } from '../models/user';
import { CryptoService } from './crypto.service';

@Injectable()
export class SessionService {
  private keyUser = 'user_token';

  constructor(private crypto: CryptoService) {}

  public setUser(data: UserModel) {
    localStorage.setItem(this.keyUser, this.crypto.set(JSON.stringify(data)));
  }

  public getUser(): UserModel {
    const decrypted = this.decryptItem(this.keyUser);
    return JSON.parse(decrypted);
  }

  public decryptItem(key: string) {
    try {
      const encrypted = localStorage.getItem(key);
      if (encrypted) {
        return this.crypto.get(encrypted);
      }
    } catch (e) {}
    return null;
  }
}
