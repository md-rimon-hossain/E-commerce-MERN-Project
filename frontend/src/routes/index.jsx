import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import { Cart, Error, Home, Login, Product, Register, UserProfile } from "../pages/index.js";
import IsAdmin from "../components/IsAdminLayout.jsx";
import DashBoard from "../pages/DashBoard.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import UserActivate from "../pages/UserActivete.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "/cart",
        element: (
          <AuthLayout authentication>
            <Cart />
          </AuthLayout>
        ),
      },
      {
        path: "/user-profile",
        element: (
          <AuthLayout authentication>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AuthLayout authentication>
            <IsAdmin isAdmin={true}>
              <DashBoard />
            </IsAdmin>
          </AuthLayout>
        ),
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/users/activate/:token",
    element: <UserActivate />,
  },
]);

export default router;
