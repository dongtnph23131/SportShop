import React from 'react'
import { Navigate, createBrowserRouter } from "react-router-dom";
import WebsiteLayout from './components/WebsiteLayout';
import Home from './components/Home';
import Cart from './components/Cart';
import Signin from './components/Signin';
import Signup from './components/Signup';
export const routers  = createBrowserRouter ([
    {
        path:"/",
        element:<WebsiteLayout></WebsiteLayout>,
        children: [
            {index: true, element: <Navigate to="Home"/>},
            {
                path: "Home",

                element: (
                    <>
                        <Home></Home>
                    </>
                ),
                
            },
            {path: "/cart", element: <Cart/>}
        ]

    },

    {path: "/signin", element: <Signin/>},
    
    {path:"/signup" , element:<Signup></Signup>}
 ])