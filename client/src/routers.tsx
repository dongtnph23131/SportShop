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
import Forgot from './components/Forgot';
import Detail from './components/Detail';
import Shops from './components/Shops';
import Contact from './components/Contact';
import Blog from './components/Blog';
import About from './components/About';
import ForgotToken from './components/ForgotToken';
import ForgotSuccessfully from './components/ForgotSuccessfully';
import AllCategories from './components/pages/admin/categories/AllCategories';
import AddCategories from './components/pages/admin/categories/AddCategories';
import EditCategories from './components/pages/admin/categories/EditCategories';
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
            {path: "/cart", element: <Cart/>},
            {path: "/detail", element: <Detail/>},
            {path:"/shops",element:<Shops></Shops>},
            {path:"/contact",element:<Contact/>},
            {path:"/blog",element:<Blog/>},
            {path:"/about",element:<About/>}

        ]

    },
    {
        path: "/admin", element: <MainLayout/>,
        children: [
            {index: true, element: <Dashboard/>},
            {path: "products", element: <ProductPage/>},
            {path: "products/add", element: <ProductAdd/>},
            {path: "categories", element: <AllCategories/>},
            {path: "categories/add", element: <AddCategories/>},
            {path: "categories/:id/edit", element: <EditCategories/>},
        ]
        
    },
    

    {path: "/signin", element: <Signin/>},
    
    {path:"/signup" , element:<Signup></Signup>},
    {path:"/forgot" , element:<Forgot></Forgot>},
    {path:"/forgottoken" ,element:<ForgotToken/>},
    {path:"/forgotSucces" ,element:<ForgotSuccessfully/>}


 ])