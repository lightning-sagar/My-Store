import { CgProfile } from "react-icons/cg";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userAtom from '../Atom/userAtom.js';
import { useRecoilValue } from 'recoil';
import uselogout from '../hooks/logout.jsx';

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const user = useRecoilValue(userAtom);
  const logout = uselogout();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl md:text-4xl font-bold text-rose-800">
            MyStore
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 md:space-x-8">
            <Link
              to="/"
              className="text-lg md:text-xl text-rose-800 hover:text-rose-600 transition"
            >
              Home
            </Link>
            <Link
              to="/Add"
              className="text-lg md:text-xl text-rose-800 hover:text-rose-600 transition"
            >
              <AiOutlineAppstoreAdd className="w-6 h-6 md:w-8 md:h-8" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="focus:outline-none"
              >
                {user ? (
                  <img
                    src="data:image/png;base64,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"
                    alt="Profile"
                    className="rounded-full w-10 h-10 md:w-12 md:h-12"
                  />
                ) : (
                  <CgProfile className="w-8 h-8 md:w-10 md:h-10 text-rose-800" />
                )}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-rose-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {user ? (
                    <button
                      className="block w-full text-left px-4 py-2 text-rose-800 hover:bg-gray-100"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/Signin"
                      className="block w-full text-left px-4 py-2 text-rose-800 hover:bg-gray-100"
                    >
                      Signin
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
  