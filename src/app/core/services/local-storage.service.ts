import { Injectable } from '@angular/core';

const APP_PREFIX = 'notesy_';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() {
  }

  setItem(key: string, value: string) {
    localStorage.setItem(this.addPrefix(key), value);
  }

  getItem(key: string) {
    return localStorage.getItem(this.addPrefix(key));
  }

  removeItem(key: string) {
    return localStorage.removeItem(this.addPrefix(key));
  }

  private addPrefix(key: string) {
    return APP_PREFIX.concat(key);
  }
}
