import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
  private tokenKey = 'xigofe08';
  private token: string;

  constructor(private apiService: ApiService) {
    this.isUser = new BehaviorSubject<boolean>(false);
    this.isAdmin = new BehaviorSubject<boolean>(false);
  }

  init(): void {
    const currentToken = window.localStorage.getItem(this.tokenKey);

    if (currentToken !== null) {
      this.checkToken(currentToken);
    }
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
    window.localStorage.removeItem(this.tokenKey);
    this.isUser.next(false);
    this.isAdmin.next(false);
  }

  authenticate(authUser: AuthUser) {
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

  checkToken(token: string): void {
    this.apiService.post<AuthUser>(
      {
        apiEndpoint: 'authentication/checktoken',
        requestBody: {
          token: token
        }
      }
    ).subscribe((data) => {
      this.authenticate(data);
    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    });
  }


}
