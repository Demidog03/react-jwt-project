import {createBrowserRouter, Navigate} from "react-router";
import HomePage from "./modules/home/pages/home.page.tsx";
import LoginPage from "./modules/auth/pages/login.page.tsx";
import TestPage from "./modules/home/pages/test.page.tsx";
import AuthPageGuard from "./modules/guards/ui/auth-page-guard.tsx";
import PublicPageGuard from "./modules/guards/ui/public-page-guard.tsx";
import MainLayout from "./shared/ui/main-layout.tsx";
import ProfilePage from "./modules/profile/pages/profile.page.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" />
    },
    {
        path: "/home",
        element: (
            <MainLayout />
        ),
        children: [
            {
                index: true, // /home
                element: <HomePage/>

            },
            {
                path: 'test', // /home/test
                element: <TestPage/>
            }
        ]
    },
    {
        path: '/login',
        element: (
            <PublicPageGuard>
                <MainLayout/>
            </PublicPageGuard>
        ),
        children: [
            {
                index: true,
                element: <LoginPage/>
            }
        ]
    },
    {
        path: '/profile',
        element: (
            <AuthPageGuard>
                <MainLayout/>
            </AuthPageGuard>
        ),
        children: [
            {
                index: true,
                element: <ProfilePage/>
            }
        ]
    }
]);

export default router;