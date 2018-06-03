import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user';
import { ApiService } from './api.service';
import { UserRegister } from '../models/user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  registerUser(user: UserRegister): Observable<AuthUser> {

    return this.apiService.post<AuthUser>(
      {
        apiEndpoint: 'authentication/register',
        requestBody: user
      }
    );
  }

  getRoles(authUser: AuthUser): Observable<any> {
    return this.apiService.get(
      {
        apiEndpoint: 'authentication/myroles',
        token: authUser.token
      }
    );
  }
}
