import type {GetProfileResponse, LoginBody, LoginResponse} from "./auth.api.types.ts";
import axios from "axios";

async function login(body: LoginBody): Promise<LoginResponse> {
    const { data } = await axios.post<LoginResponse>('http://localhost:3000/users/login', body);
    return data
}

async function getProfile(token: string): Promise<GetProfileResponse> {
    const { data } = await axios.get<GetProfileResponse>('http://localhost:3000/users/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data
}

const authApi = {
    login,
    getProfile
}

export default authApi