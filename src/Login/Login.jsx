import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('patient');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#9334ea] mb-2">Login</h1>
          <p className="text-gray-600">Welcome <span className='text-[#9334ea]'>Medic+</span>! Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                value=""
                className="block w-full pl-10 pr-3 py-3 border border-[#9334ea] rounded-lg  focus:border-[#9334ea] "
                required
              />
            </div>
          </div>

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
                value=""
                className="block w-full pl-10 pr-10 py-3 border border-[#9334ea] rounded-lg  focus:border-[#9334ea]"
                required
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
          </div>


          <div className="flex justify-center space-x-6 mb-6">
            <button
              type="button"
              className={`flex items-center ${userType === 'doctor' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
              onClick={() => setUserType('doctor')}
            >
              <span className={`h-3 w-3 rounded-full mr-2 ${userType === 'doctor' ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
              Login as Doctor
            </button>

            <button
              type="button"
              className={`flex items-center ${userType === 'patient' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
              onClick={() => setUserType('patient')}
            >
              <span className={`h-3 w-3 rounded-full mr-2 ${userType === 'patient' ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
              Login as Patient
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#9334ea] border-[1px] border-white text-white py-3 px-4 rounded-lg font-medium "
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#9334ea] font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;