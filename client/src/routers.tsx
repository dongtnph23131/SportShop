import React from 'react'
import { Navigate, createBrowserRouter } from "react-router-dom";
import WebsiteLayout from './components/WebsiteLayout';
import Home from './components/Home';
import Cart from './components/Cart';
import Signin from './components/Signin';
import Signup from './components/Signup';
import MainLayout from './components/layouts/LayoutAdmin';
import ProductPage from './components/pages/admin/products/ProductPage';
import ProductAdd from './components/pages/admin/products/ProductAdd';
import Dashboard from './components/pages/admin/Dashboard';
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
    {
        path: "/admin", element: <MainLayout/>,
        children: [
            {index: true, element: <Dashboard/>},
            {path: "products", element: <ProductPage/>},
            {path: "products/add", element: <ProductAdd/>},
        ]
        
    },
    

    {path: "/signin", element: <Signin/>},
    
    {path:"/signup" , element:<Signup></Signup>}
 ])