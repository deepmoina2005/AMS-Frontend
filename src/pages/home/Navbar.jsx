import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-indigo-700 to-violet-500 transition-all">
      
      {/* Logo */}
      <Link to="/">
        <img
          className="h-9"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg"
          alt="Logo"
        />
      </Link>

      {/* Nav Links - Desktop */}
      <ul className="text-white hidden md:flex items-center gap-10 font-medium">
        <li>
          <Link to="/" className="hover:text-white/80 transition duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-white/80 transition duration-300">
            About
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-white/80 transition duration-300">
            Services
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-white/80 transition duration-300">
            Contact
          </Link>
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Link to="/choose">
          <button
            type="button"
            className="bg-white cursor-pointer text-gray-800 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all w-36 h-10 rounded-full"
          >
            Login
          </button>
        </Link>
        <Link to="/Adminregister">
          <button
            type="button"
            className="border cursor-pointer border-white text-white text-sm font-semibold hover:bg-white hover:text-gray-800 active:scale-95 transition-all w-36 h-10 rounded-full"
          >
            Register
          </button>
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden inline-flex items-center justify-center focus:outline-none active:scale-90 transition"
      >
        {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 md:hidden shadow-md z-20">
          <ul className="flex flex-col space-y-4 text-white text-base font-medium">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-white/80 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-white/80 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-white/80 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-white/80 transition">
                Contact
              </Link>
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <Link to="/choose">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white text-gray-800 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all w-full h-10 rounded-full"
              >
                Login
              </button>
            </Link>
            <Link to="/Adminregister">
              <button
                onClick={() => setIsOpen(false)}
                className="border border-white text-white text-sm font-semibold hover:bg-white hover:text-gray-800 active:scale-95 transition-all w-full h-10 rounded-full"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;