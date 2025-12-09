export interface LoginBody {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface GetProfileResponse {
    id: number
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}