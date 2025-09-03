
import {createBrowserRouter} from "react-router-dom";

import Home from "../Home/Home";
import MainLayout from "../MainLayout/MainLayout";
import About from "../Home/About/About";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Contact from "../Home/Contact/Contact";
import DoctorDashboard from "../Dashboard/DoctorDashboards/DoctorDashboard/DoctorDashboard";
import PatientDashboard from "../Dashboard/PatientDashboards/PatientDashboard/PatientDashboard";
import BookAppointment from "../Dashboard/PatientDashboards/BookAppointment/BookAppointment";
import MyAppointments from "../Dashboard/PatientDashboards/MyAppointments/MyAppointments";


  
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
          path: "/contact",
          element: <Contact></Contact>,
        },
        {
          path: "/patient/dashboard",
          element: <PatientDashboard></PatientDashboard>,
        },
        { 
          path: "/book-appointment/:doctorId", 
          element:<BookAppointment></BookAppointment>
        },
        {
          path: "/myAppointment",
          element: <MyAppointments></MyAppointments>,
        },
        {
          path: "/doctor/dashboard",
          element: <DoctorDashboard></DoctorDashboard>,
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