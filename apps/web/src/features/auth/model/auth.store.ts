import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../../entitites/user';
import { TokenService } from '../lib';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
}

interface AuthActions {
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: User) => void;
    clear: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
};

export const useAuthStore = create<AuthStore>()(persist((set) => ({
    ...initialState,
    setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
    setUser: (user) => set({ user }),
    clear: () => set(initialState),
}), {
    name: 'auth',
}));

useAuthStore.subscribe((state, prev) => {
    const { accessToken, refreshToken } = state;

    if (!accessToken || !refreshToken) {
        TokenService.clearTokens();
        return;
    }

    const isTokenChanged = accessToken !== prev.accessToken || refreshToken !== prev.refreshToken;
    if (isTokenChanged) {
        TokenService.setTokens({ accessToken, refreshToken });
    }
});