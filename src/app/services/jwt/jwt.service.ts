import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Jwt } from 'src/app/models/jwt/jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  decodeToken(token: string): Jwt {
    return jwtDecode(token);
  }
}
