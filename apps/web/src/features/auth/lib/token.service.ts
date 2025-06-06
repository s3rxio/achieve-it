import { User } from "../../../entitites/user";
import { AuthResponse } from "../types";

export class TokenService {
    static setTokens({ accessToken, refreshToken }: Partial<AuthResponse>) {
        localStorage.setItem('accessToken', accessToken || "");
        localStorage.setItem('refreshToken', refreshToken || "");
    }

    static clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    static setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    static getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    static getUser() {
        const user = localStorage.getItem('user');

        if (!user) {
            return null;
        }

        return JSON.parse(user) as User;
    }
}
