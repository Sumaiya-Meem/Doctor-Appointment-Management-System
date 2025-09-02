
import {createBrowserRouter} from "react-router-dom";

import Home from "../Home/Home";
import MainLayout from "../MainLayout/MainLayout";
import About from "../Home/About/About";
import Login from "../Login/Login";
import Register from "../Register/Register";


  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
        
      
         
   
      ]
      }
   
  ]);

export default router ;