
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout"
import Home from "../pages/Home"
import Events from "../components/Events";
import Schedule from "../pages/Schedule";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import ForgetPassword from "../pages/ForgetPassword";
import Bookings from "../pages/Bookings";
import Contact from "../pages/Contact";
import  AdminDashboard from "../admin/AdminDashboard";



const router = createBrowserRouter([{
    path: "/",
    element: <MainLayout />,
    children: [{
        path: "/",
        element: <Home />
    }, {
        path: "/events",
        element: <Events />
    }, 
    {
        path: "/schedule",
        element: <Schedule />
    },
    {
        path:"/booking",
        element:<Bookings/>
    },{
        path:"/contact",
        element:<Contact/>
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
},
{path:"/admin/dashboard",
    element:<AdminDashboard/>
}
])

export default router;