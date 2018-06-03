import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPostModel, ApiAuthorizedGetModel } from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  httpHeaders: HttpHeaders;
  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append('Content-Type', 'application/json');
    this.httpHeaders.append('Accept', 'application/json');
    this.apiUrl = 'https://localhost:44391/api/';
  }

  post<T>(apiModel: ApiPostModel): Observable<T> {
    this.detachToken();

    return this.httpClient.post<T>(this.apiUrl + apiModel.apiEndpoint,
      apiModel.requestBody,
      {
        headers: this.httpHeaders
      });
  }

  get(apiModel: ApiAuthorizedGetModel): Observable<any> {
    this.attachToken(apiModel.token);

    return this.httpClient.get(this.apiUrl + apiModel.apiEndpoint, {
      headers: this.httpHeaders
    });
  }

  private attachToken(token: string) {
    this.httpHeaders.append('Authorization', `Bearer ${token}`);
  }

  private detachToken() {
    this.httpHeaders.delete('Authorization');
  }
}
