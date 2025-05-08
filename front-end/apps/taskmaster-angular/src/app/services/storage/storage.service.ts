import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _cachedToken: string | null = null;
  private TOKEN_KEY: string = 'AUTH_TOKEN_KEY';

  public setToken(token: string): void {
    if (!window) {
      return;
    }

    this._cachedToken = token;
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }
  public getToken(): string | null {
    if (!window) {
      return null;
    }

    if (!this._cachedToken) {
      this._cachedToken = window.localStorage.getItem(this.TOKEN_KEY);
    }

    return this._cachedToken;
  }

  public clearToken(): void {
    if (!window) {
      return;
    }

    this._cachedToken = null;
    window.localStorage.removeItem(this.TOKEN_KEY);
  }
}
