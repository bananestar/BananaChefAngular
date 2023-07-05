import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/user/login';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/user/register';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = 'https://localhost:7238/api/User/';

  constructor(private _http: HttpClient, private _storage: StorageService) {}

  login(login: Login): Observable<string> {
    return this._http.post(this.api + 'login', login, {
      responseType: 'text',
    });
  }

  register(register: Register): Observable<any> {
    return this._http.post(this.api + 'register', register, {
      responseType: 'text',
    });
  }

  logOut(): void {
    this._storage.clean();
  }
}
