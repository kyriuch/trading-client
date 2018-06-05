import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPostModel, ApiGetModel } from '../models/api-models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://localhost:44391/api/';

  constructor(private httpClient: HttpClient, private auth: AuthService) {
  }

  post<T>(apiModel: ApiPostModel, shouldAttachToken = false): Observable<T> {
    let httpHeaders = this.generateHeaders();

    if (shouldAttachToken) {
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${this.auth.getToken()}`);
    }

    return this.httpClient.post<T>(this.apiUrl + apiModel.apiEndpoint,
      apiModel.requestBody,
      {
        headers: httpHeaders;
      });
  }

  get<T>(apiModel: ApiGetModel, shouldAttachToken = false): Observable<T> {
    let httpHeaders = this.generateHeaders();

    if (shouldAttachToken) {
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${this.auth.getToken()}`);
    }

    return this.httpClient.get<T>(this.apiUrl + apiModel.apiEndpoint, {
      headers: httpHeaders
    });
  }

  private generateHeaders(): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Accept', 'application/json');
    return httpHeaders;
  }
}
