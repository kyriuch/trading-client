export interface ApiPostModel {
    apiEndpoint: string;
    requestBody: any;
}

export interface ApiGetModel {
    apiEndpoint: string;
}

export interface ApiDeleteModel {
    apiEndpoint: string;
    id: number;
}
