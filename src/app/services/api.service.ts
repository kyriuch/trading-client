import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPostModel, ApiGetModel } from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://localhost:44391/api/';

  constructor(private httpClient: HttpClient) {
  }

  post<T>(apiModel: ApiPostModel, shouldAttachToken = false, token = null): Observable<T> {
    let httpHeaders = this.generateHeaders();

    if (shouldAttachToken) {
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.post<T>(this.apiUrl + apiModel.apiEndpoint,
      apiModel.requestBody,
      {
        headers: httpHeaders
      });
  }

  get<T>(apiModel: ApiGetModel, shouldAttachToken = false, token = null): Observable<T> {
    let httpHeaders = this.generateHeaders();

    if (shouldAttachToken) {
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
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
