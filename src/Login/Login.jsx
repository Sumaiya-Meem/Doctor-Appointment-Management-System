import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("PATIENT");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { mutate, isLoading, isError, error } = useLogin();

  const onSubmit = (data) => {
    const payload = { ...data, role }; 

    mutate(payload, {
      onSuccess: (res) => {
        const userData = res.data?.user;
        console.log("userData :",userData );

      if (!userData || !userData.role) {
        toast.error("Unable to determine the user role. Login failed.");
       return;
       }

       if (userData.role !== role) {
       toast.error(`This email is registered as ${userData.role}, not ${role}`);
       return;
      }

      // Save user info in localStorage
       localStorage.setItem('user', JSON.stringify(userData));
        console.log("Login successful:", res);
        toast.success("Login successful!");
        
        reset();
        navigate('/');
      },
      onError: (err) => {
        console.error("Login error:", err);
        
        const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || "Login failed";
        
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#9334ea] mb-2">Login</h1>
          <p className="text-gray-600">
            Welcome to <span className="text-[#9334ea]">Medic+</span>! Please enter your details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format"
                  }
                })}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9334ea] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9334ea] ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Role toggle */}
          <div className="flex justify-center space-x-6 mb-6">
            <button
              type="button"
              className={`flex items-center ${role === "DOCTOR" ? "text-[#9334ea] font-semibold" : "text-gray-500"}`}
              onClick={() => setRole("DOCTOR")}
            >
              <span className={`h-3 w-3 rounded-full mr-2 ${role === "DOCTOR" ? "bg-[#9334ea]" : "bg-gray-300"}`}></span>
              Login as Doctor
            </button>

            <button
              type="button"
              className={`flex items-center ${role === "PATIENT" ? "text-[#9334ea] font-semibold" : "text-gray-500"}`}
              onClick={() => setRole("PATIENT")}
            >
              <span className={`h-3 w-3 rounded-full mr-2 ${role === "PATIENT" ? "bg-[#9334ea]" : "bg-gray-300"}`}></span>
              Login as Patient
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#9334ea] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#7e2ac8] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {isError && (
            <p className="text-red-500 text-center mt-4">
              {error?.response?.data?.message || "Login failed"}
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#9334ea] font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;