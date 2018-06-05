export interface AuthUser {
    id: number;
    email: string;
    steamId: number;
    roles: string[];
    token: string;
}
