import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/LayoutAdmin";
import { Navigate } from "react-router-dom";
import Dashboard from "./components/pages/admin/Dashboard";
import ProductPage from "./components/pages/admin/products/ProductPage";
import AllCategories from "./components/pages/admin/categories/AllCategories";
import ProductAdd from "./components/pages/admin/products/ProductAdd";
import HomePage from "./components/pages/HomePage";

export const routers = createBrowserRouter([
  {path: "/", element: <HomePage/>},
  {
    path: "/admin",element: <MainLayout/>,
    
    children: [
        {index: true, element: <Navigate to = "dashboard"/>},
        {path: 'dashboard' , element: <Dashboard/>},
        {path: 'products' , element: <ProductPage/>},   
        {path: 'products/add' , element: <ProductAdd/>},
        {path: 'categories', element: <AllCategories/>}
    ]
  },
]);
