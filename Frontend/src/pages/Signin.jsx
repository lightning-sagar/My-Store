import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useShowToast from '../hooks/showToast.jsx';

export default function SigninCard() {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const toast = useShowToast()
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate(); 
  const handleSignin = async () => {
    try {
      const res = await fetch("/api/user/Signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:"include",
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      console.log(data, "data");
      if (data.err) {
        toast("Error",data.err,"error");  
        return;
      } else {
        localStorage.setItem("user", JSON.stringify(data));
      }
      window.location.reload()
    } catch (error) {
      console.error(error);
      toast("Error",error,"error");  

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign in to your account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          to enjoy all of our cool <span className="text-rose-800">features</span> ✌️
        </p>
        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="email"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 rounded border-gray-300" />
              Remember me
            </label>
            <button className="text-sm text-rose-500 hover:underline">
              Forgot password?
            </button>
          </div>
          <button
            onClick={handleSignin}
            className="w-full py-2 px-4 bg-rose-500 text-white font-semibold rounded-md hover:bg-rose-600"
          >
            Sign in
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate('/SignUp')} // Replace with navigation logic
              className="text-rose-500 hover:underline"
            >
              Sign-up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
