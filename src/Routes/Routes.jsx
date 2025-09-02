
import {createBrowserRouter} from "react-router-dom";

import Home from "../Home/Home";
import MainLayout from "../MainLayout/MainLayout";
import About from "../Home/About/About";


  
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
        
      
         
   
      ]
      }
   
  ]);

export default router ;