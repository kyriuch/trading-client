import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { ApiService } from '../../../services/api.service';
import { UserLogin } from '../models/user-login.dto';
import { UserRegister } from '../models/user-register.dto';
import { AuthUser } from '../models/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUser: BehaviorSubject<boolean>;
  isAdmin: BehaviorSubject<boolean>;
  authUser: AuthUser;
  private tokenKey = 'xigofe08';
  private token: string;
  private initialized = false;

  constructor(private apiService: ApiService) {
  }

  init(): Observable<AuthUser> {
    this.isUser = new BehaviorSubject(false);
    this.isAdmin = new BehaviorSubject(false);
    const currentToken = window.localStorage.getItem(this.tokenKey);

    if (currentToken !== null) {
      return this.checkToken(currentToken);
    }

    return of(undefined);
  }

  getAuthUser(): Observable<AuthUser> {
    if (this.authUser) {
      return of(this.authUser);
    }

    const currentToken = window.localStorage.getItem(this.tokenKey);

    if (!currentToken) {
      return of(undefined);
    }

    return this.apiService.post<AuthUser>(
      {
        apiEndpoint: 'authentication/checktoken',
        requestBody: {
          token: currentToken
        }
      }
    );
  }

  registerUser(user: UserRegister): Observable<AuthUser> {

    return this.apiService.post<AuthUser>(
      {
        apiEndpoint: 'authentication/register',
        requestBody: user
      }
    );
  }

  login(user: UserLogin) {
    return this.apiService.post<AuthUser>(
      {
        apiEndpoint: 'authentication/auth',
        requestBody: user
      }
    );
  }

  signOut(): void {
    this.authUser = null;
    window.localStorage.removeItem(this.tokenKey);
    this.isUser.next(false);
    this.isAdmin.next(false);
  }

  authenticate(authUser: AuthUser) {
    if (!authUser) {
      return;
    }

    if (typeof (authUser.token) !== 'string') {
      authUser.token = authUser.token['token'];
    }

    this.authUser = authUser;
    window.localStorage.setItem(this.tokenKey, authUser.token);

    this.token = authUser.token;
    this.isUser.next(authUser.roles.indexOf('User') !== -1);
    this.isAdmin.next(authUser.roles.indexOf('Admin') !== -1);
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

  checkToken(token: string): Observable<AuthUser> {
    return this.apiService.post<AuthUser>(
      {
        apiEndpoint: 'authentication/checktoken',
        requestBody: {
          token: token
        }
      }
    );
  }
}
