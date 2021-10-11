import { Injectable } from '@angular/core';

export interface UserData {
  email: string;
  uid: string;
  rol: string;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private userDataKey: string;

  constructor() {
    this.userDataKey = 'rmro_user_data_key';
  }

  clearUser() {
    localStorage.removeItem(this.userDataKey);
  }

  get user() {
    try {
      return JSON.parse(localStorage.getItem(this.userDataKey) || '');
    } catch (error) {
      this.clearUser();
      return null;
    }
  }

  set user(data: UserData | null) {
    try {
      if (data == null) {
        this.clearUser();
      } else {
        localStorage.setItem(this.userDataKey, JSON.stringify(data));
      }
    } catch (error) {
      this.clearUser();
    }
  }
}
