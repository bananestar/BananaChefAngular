import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  saveUser(token: string): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(token));
  }

  getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) return JSON.parse(user);
    return {};
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) return true;
    return false;
  }
}
