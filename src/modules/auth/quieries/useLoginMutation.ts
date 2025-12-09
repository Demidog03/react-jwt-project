import {useMutation, type UseMutationResult} from "@tanstack/react-query";
import authApi from "../api/auth.api.ts";
import type {LoginBody, LoginResponse} from "../api/auth.api.types.ts";
import type {AxiosError} from "axios";

export const useLoginMutation = (): UseMutationResult<LoginResponse, AxiosError, LoginBody> => {
    return useMutation({
        mutationKey: ['users/login'] as const,
        mutationFn: (body) => authApi.login(body)
    })
}