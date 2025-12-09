import {useQuery, type UseQueryResult} from "@tanstack/react-query";
import type {GetProfileResponse} from "../api/auth.api.types.ts";
import type {AxiosError} from "axios";
import {useAuthStore} from "../store/auth.store.ts";
import authApi from "../api/auth.api.ts";

export const useGetProfileQuery = (): UseQueryResult<GetProfileResponse, AxiosError> => {
    const { token } = useAuthStore();

    return useQuery({
        queryKey: ['auth/getProfile'],
        queryFn: () => authApi.getProfile(token ?? ''),
        enabled: Boolean(token),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    })
}