import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./components/WebsiteLayout";
import Home from "./components/Home";
import Cart from "./components/Cart";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout></WebsiteLayout>,
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: "home",element: (  <Home></Home> ) },
     
    ],

  },
  {path:"/cart" , element:(<Cart></Cart>)}
  
]);
