import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPostModel, ApiAuthorizedGetModel } from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'https://localhost:44391/api/';
  }

  post<T>(apiModel: ApiPostModel): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl + apiModel.apiEndpoint,
      apiModel.requestBody,
      {
        headers: this.generateHeaders()
      });
  }

  get(apiModel: ApiAuthorizedGetModel): Observable<any> {
    let httpHeaders = this.generateHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${apiModel.token}`);
    console.log(httpHeaders.getAll('Authorization'));

    return this.httpClient.get(this.apiUrl + apiModel.apiEndpoint, {
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
