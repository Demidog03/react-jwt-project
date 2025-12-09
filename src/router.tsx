import {createBrowserRouter, Navigate} from "react-router";
import HomePage from "./modules/home/pages/home.page.tsx";
import LoginPage from "./modules/auth/pages/login.page.tsx";
import TestPage from "./modules/home/pages/test.page.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" />
    },
    {
        path: "/home",
        element: <HomePage/>,
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/test',
        element: <TestPage/>
    }
]);

export default router;