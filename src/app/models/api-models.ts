import { HttpHeaders } from '@angular/common/http';

export interface ApiPostModel {
    apiEndpoint: string;
    requestBody: any;
}

export interface ApiGetModel {
    apiEndpoint: string;
}
