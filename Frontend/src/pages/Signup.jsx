'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../Atom/userAtom.js'
import { useNavigate } from 'react-router-dom'
import useShowToast from '../hooks/showToast.jsx';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setUser = useSetRecoilState(userAtom)
  const navigate = useNavigate()
  const showtoast = useShowToast();
  const [inputs, setInputs] = useState({
    name: '',
    lname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    country: '',
    city: '',
    address: '',
    pincode: '',
  })

  const handleSignup = async () => {
    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:"include",
        body: JSON.stringify(inputs),
      })
      const data = await res.json()
      if (data.err) {
        showtoast('Error', data.err, 'error')
        return
      }
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      window.location.reload()
    } catch (error) {
      console.error(error)
      showtoast('Error', 'An error occurred', 'error')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign up</h2>
        <p className="text-center text-gray-600 mt-2">
          to enjoy all of our cool <span className="text-rose-500">features</span> ✌️
        </p>
        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="name"
                type="text"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lname"
                type="text"
                value={inputs.lname}
                onChange={(e) => setInputs({ ...inputs, lname: e.target.value })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              value={inputs.phone}
              onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              id="country"
              type="text"
              value={inputs.country}
              onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your country"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              type="text"
              value={inputs.city}
              onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              value={inputs.address}
              onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your address"
            ></textarea>
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              value={inputs.pincode}
              onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              placeholder="Enter your pincode"
            />
          </div>
          <button
            onClick={handleSignup}
            className="w-full py-2 px-4 bg-rose-500 text-white font-semibold rounded-md hover:bg-rose-600"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}
