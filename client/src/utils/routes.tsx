
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout"
import Home from "../pages/Home"
import Events from "../components/Events";
import Schedule from "../pages/Schedule";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import ForgetPassword from "../pages/ForgetPassword";


const router = createBrowserRouter([{
    path: "/",
    element: <MainLayout />,
    children: [{
        path: "/",
        element: <Home />
    }, {
        path: "/events",
        element: <Events />
    }, {
        path: "/contact",
        element: <h1>Contact</h1>
    },
    {
        path: "/schedule",
        element: <Schedule />
    },

    ],
},
{
    path:"/login",
    element:<Login/>
},
{
    path:"/signup",
    element:<SignUp/>
},
{
    path:"/forget-password",
    element:<ForgetPassword/>
}
])

export default router;