import { HttpHeaders } from '@angular/common/http';

export interface ApiPostModel {
    apiEndpoint: string;
    requestBody: any;
}

export interface ApiAuthorizedGetModel {
    apiEndpoint: string;
    token: string;
}
