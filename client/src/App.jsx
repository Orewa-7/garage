import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Home from "./Pages/Home.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Single from "./Pages/Single.jsx";

export const proxy = "http://localhost:8800/api";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/voiture/:id",
                element: <Single />,
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default function App() {

    return <>
        <div className="app">
            <RouterProvider router={router} />
        </div>
    </>
}