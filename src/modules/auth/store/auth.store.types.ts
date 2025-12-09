const AUTH_STORE_ACTIONS_KEY = 'auth'

export enum AUTH_STORE_ACTIONS {
    addToken = AUTH_STORE_ACTIONS_KEY + '/addToken',
}

export interface AuthStoreState {
    token: string | null
    addToken: (newToken: string) => void
}