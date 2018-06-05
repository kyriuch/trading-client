import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthUser } from '../models/auth-user';
import { ApiService } from './api.service';
import { UserRegister } from '../models/user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUser: BehaviorSubject<boolean>;
  isAdmin: BehaviorSubject<boolean>;
  private tokenKey = 'xigofe08';
  private token: string;

  constructor(private apiService: ApiService) {
    this.isUser = new BehaviorSubject<boolean>(false);
    this.isAdmin = new BehaviorSubject<boolean>(false);
  }

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
      },
      true
    );
  }

  authenticate(authUser: AuthUser, roles: string[]) {
    window.localStorage.setItem(this.tokenKey, authUser.token);
    this.token = authUser.token;
  }

  isAuthenticatedAsUser(): boolean {
    return this.isUser.value;
  }

  isAuthenticatedAsAdmin(): boolean {
    return this.isAdmin.value;
  }

  getToken(): string {
    return this.token;
  }
}
