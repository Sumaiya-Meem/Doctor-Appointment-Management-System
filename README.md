# 🏥 Doctor Appointment Management System

A comprehensive web-based application designed to streamline the process of booking and managing appointments between patients and healthcare providers. Built using React.js with Vite, it offers a seamless experience for users to search for doctors, book appointments, and manage their healthcare schedule.

🌐 **Live Demo:**  
[https://doctor-appointment-management-syste.vercel.app/](https://doctor-appointment-management-syste.vercel.app/)

---

## ✨ Features

### For Patients
- 🔐 **User Authentication** - Secure login system using localStorage
- 👨‍⚕️ **Doctor Search & Discovery** - Browse doctors by specialty with search and filtering
- 📅 **Appointment Booking** - Intuitive date selection and booking system
- 📋 **Appointment Management** - View, track, and cancel appointments with status updates
- 👤 **Profile Management** - Personal information storage

### For Doctors
- 📊 **Appointment Dashboard** - View and manage patient appointments
- 🔄 **Status Management** - Update appointment status (Pending, Completed, Cancelled)
- 👥 **Patient Information** - Access patient details and appointment history

### General Features
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Real-time Updates** - Instant status changes and UI updates
- 🎨 **Intuitive UI/UX** - Clean, professional healthcare-focused design
- 💾 **Local Data Storage** - All data persisted in browser's localStorage

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js - Component-based UI library  
- Vite - Fast build tool and development server  
- Tailwind CSS - Utility-first CSS framework  
- React Router - Navigation and routing  
- React Icons - Icon library  
- React Hot Toast - Notifications and alerts  
- React Datepicker - Date selection component  

**Data Storage:**  
- LocalStorage - Client-side data persistence  
- Browser Session Management - User authentication state  

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)  
- npm or yarn package manager  

### 🧑‍💻 Steps to Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/Sumaiya-Meem/Doctor-Appointment-Management-System.git
cd Doctor-Appointment-Management-System

2. **Install dependencies** 

npm install


3. **Start the development server**  

npm start


🔧 Build with Vite

This project uses Vite as its build tool, which provides:

⚡️ Lightning fast cold server start

🔥 Instant Hot Module Replacement (HMR)

🛠️ Rich features out of the box

📦 Optimized build

🔮 Future Enhancements

📧 Email notifications for appointments

📅 Advanced calendar integration

💬 Patient-doctor messaging system

⚕️ Medical records management

📊 Analytics dashboard

🎨 Theme customization options

📁 Project Structure

src/
├── assets/ # Static assets (images, icons, etc.)
├── components/ # Reusable UI components
│ ├── Footer/ # Footer component
│ ├── Header/ # Header component
│ ├── Dashboard/ # Dashboard components
│ └── Home/ # Home page components
├── hooks/ # Custom React hooks
│ ├── useLogin.js # Authentication hook
│ └── useRegister.js # Registration hook
├── Login/ # Login page components
├── MainLayout/ # Main layout component
├── Register/ # Registration page components
└── Routes/ # Application routing
└── Routes.jsx # Main router component