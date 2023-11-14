import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./components/WebsiteLayout";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Forgot from "./components/Forgot";
import Detail from "./components/Detail";
import Shops from "./components/Shops";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import About from "./components/About";
import ForgotToken from "./components/ForgotToken";
import Profile from "./components/Profile";
import Changepassword from "./components/Changepassword";
import OrderClient from "./components/OrderClient";
import CategoryDetail from "./components/CategoryDetail";
import ProfileDetail from "./components/ProfileDetail";
import OrderDetail from "./components/OrderDetail";
import Cookies from "js-cookie";
const PrivateRouter = () => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to={"/signin"} />;
  }
  return <Outlet />;
};
export const routers = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout></WebsiteLayout>,
    children: [
      { index: true, element: <Navigate to="Home" /> },
      {
        path: "Home",

        element: (
          <>
            <Home></Home>
          </>
        ),
      },
      { path: "/cart", element: <Cart /> },
      { path: "/products/:id", element: <Detail /> },
      { path: "/shops", element: <Shops></Shops> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <Blog /> },
      { path: "/about", element: <About /> },
      {
        path: "/profile",
        element: <PrivateRouter />,
        children: [{ index: true, element: <Profile /> }],
      },
      {
        path: "/profileDetail",
        element: <PrivateRouter />,
        children: [{ index: true, element: <ProfileDetail /> }],
      },
      {
        path: "/changepassword",
        element: <PrivateRouter />,
        children: [{ index: true, element: <Changepassword /> }],
      },
      {
        path: "/OrderClient",
        element: <PrivateRouter />,
        children: [{ index: true, element: <OrderClient /> }],
      },
      { path: "/categories/:id", element: <CategoryDetail /> },
      {
        path: "/orderDetail/:id",
        element: <PrivateRouter />,
        children: [{ index: true, element: <OrderDetail /> }],
      },
    ],
  },

  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup></Signup> },
  { path: "/forgot", element: <Forgot></Forgot> },
  { path: "/forgottoken", element: <ForgotToken /> },
]);
