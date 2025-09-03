import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import {FaUser,FaEnvelope,FaLock,FaStethoscope,FaEye,FaEyeSlash,} from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const {register,handleSubmit,formState: { errors },watch,reset,setValue} = useForm();
  const { mutate, isLoading, isError, error } = useRegister();
  const password = watch("password", "");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    if (photoPreview) {
      data.photo_url = photoPreview;
    }

    mutate(
      { role, data },
      {
        onSuccess: (res) => {
          console.log("Registered:", res);
          toast.success("Account created successfully!");
          reset();
          setPhotoPreview(null);
          navigate("/login");
        },
        onError: (err) => {
          console.error("Error:", err);
          toast.error(err.response?.data?.message || "Registration failed");
        },
      }
    );
  };

  // Password validation
  const validatePassword = (value) => {
    if (!value) return "Password is required";

    if (value.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"?]/.test(value)) {
      return "Password must contain at least one special character";
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#9230ed] mb-2">
            Registration
          </h1>
          <p className="text-gray-600">
            Create your account at{" "}
            <span className="text-[#9334ea]">Medic+</span>
          </p>
        </div>

        {/* Tabs section*/}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-2 px-4 font-medium text-center ${
              role === "patient"
                ? "text-[#9334ea] border-b-2 border-[#9334ea]"
                : "text-gray-500"
            }`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={`flex-1 py-2 px-4 font-medium text-center ${
              role === "doctor"
                ? "text-[#9334ea] border-b-2 border-[#9334ea]"
                : "text-gray-500"
            }`}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>

        {/* Registration form  section*/}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                {...register("name", { required: "Name is required" })}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg  ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
                {...register("password", {
                  validate: validatePassword,
                })}
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg ${
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}

            {/* Password strength indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center mb-1">
                  <div
                    className={`h-1 flex-1 mr-1 rounded-full ${
                      password.length >= 6 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-1 flex-1 mr-1 rounded-full ${
                      /[A-Z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-1 flex-1 mr-1 rounded-full ${
                      /[0-9]/.test(password) ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      /[!@#$%^&*()_+\-=[\]{};':"?]/.test(password)
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  Must include: 6+ characters, 1 uppercase, 1 number, 1 special
                  character
                </p>
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Photo
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#9334ea] file:text-white hover:file:bg-[#7e2ac8] cursor-pointer"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
            </div>
          </div>

          {/* specialization field*/}
          {role === "doctor" && (
            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Specialization
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaStethoscope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="specialization"
                  type="text"
                  placeholder="Your medical specialization"
                  {...register("specialization", {
                    required: "Specialization is required",
                  })}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg ${
                    errors.specialization ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.specialization && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.specialization.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#9334ea] hover:bg-[#7e2ac8] text-white py-3 px-4 rounded-lg font-medium transition-colors mt-6 disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isError && (
            <p className="text-red-500 text-center mt-4">
              {error?.response?.data?.message || "Registration failed"}
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#9334ea] font-bold hover:text-blue-800"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
