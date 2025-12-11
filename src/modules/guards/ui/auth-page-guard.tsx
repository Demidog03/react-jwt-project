import {useGetProfileQuery} from "../../auth/quieries/useGetProfileQuery.ts";
import {Navigate} from "react-router";
import {type JSX, type ReactNode} from "react";
import FullscreenLoader from "../../../shared/ui/fullscreen-loader.tsx";

interface AuthGuardProps {
    children?: ReactNode | JSX.Element;
}

function AuthPageGuard({ children }: AuthGuardProps) {
    const { isSuccess, isLoading } = useGetProfileQuery()

    // Подожди пока запрос обработается (!isLoading) и потом проверь удачна ли обработка запроса (!isSuccess)
    if (!isSuccess && !isLoading) {
        return <Navigate to="/login"/>
    }

    if (isLoading) {
        return <FullscreenLoader isLoading={isLoading} />
    }

    return children
}

export default AuthPageGuard;