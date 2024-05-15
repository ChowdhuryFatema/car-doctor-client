import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Home/SignUp/SignUp";
import CheckOut from "../pages/CheckOut/CheckOut";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
            path: 'login', 
            element: <Login></Login>
        }, 
        {
            path: 'signup', 
            element: <SignUp></SignUp>
        },
        {
            path: '/checkout/:id', 
            element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
            loader: ({params}) => fetch(`https://car-doctor-server-seven-lemon.vercel.app/services/${params.id}`)
        },
        {
          path: '/bookings', 
          element: <PrivateRoute><Bookings></Bookings></PrivateRoute>,
      },
      ],
    },
  ]);

export default router;