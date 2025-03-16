/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to determine active page
  const isActive = (path) => location.pathname === path;

  // Get current page name for mobile header
  const getCurrentPageName = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/location":
        return "Location";
      case "/gallery":
        return "Gallery";
      case "/enquiry":
        return "Enquiry";
      case "/about-us":
        return "About Us";
      default:
        return "Menu";
    }
  };

  return (
    <nav className="fixed top-0 w-full z-30 bg-black/40 backdrop-blur-sm transition-all duration-300">
      {/* Desktop Navigation */}
      <div className="hidden md:flex container mx-auto justify-between items-center px-8 py-4">
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`text-xl font-medium text-white p-2 transition-colors duration-300 ${
              isActive("/") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Home
          </Link>
          <Link
            to="/location"
            className={`text-xl font-medium text-white p-2 transition-colors duration-300 ${
              isActive("/location") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Location
          </Link>
          <Link
            to="/gallery"
            className={`text-xl font-medium text-white p-2 transition-colors duration-300 ${
              isActive("/gallery") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Gallery
          </Link>
          <Link
            to="/enquiry"
            className={`text-xl font-medium text-white p-2 transition-colors duration-300 ${
              isActive("/enquiry") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Enquiry
          </Link>
          <Link
            to="/about-us"
            className={`text-xl font-medium text-white p-2 transition-colors duration-300 ${
              isActive("/about-us") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            About Us
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-black/40">
        <span className="text-2xl text-white font-semibold">
          {getCurrentPageName()}
        </span>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black/40"
      >
        <div className="flex flex-col px-4 py-2 space-y-2">
          <Link
            to="/"
            className={`text-2xl text-white p-2 transition-colors duration-300 ${
              isActive("/") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Home
          </Link>
          <Link
            to="/location"
            className={`text-2xl text-white p-2 transition-colors duration-300 ${
              isActive("/location") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Location
          </Link>
          <Link
            to="/gallery"
            className={`text-2xl text-white p-2 transition-colors duration-300 ${
              isActive("/gallery") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Gallery
          </Link>
          <Link
            to="/enquiry"
            className={`text-2xl text-white p-2 transition-colors duration-300 ${
              isActive("/enquiry") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            Enquiry
          </Link>
          <Link
            to="/about-us"
            className={`text-2xl text-white p-2 transition-colors duration-300 ${
              isActive("/about-us") ? "bg-[#FF4C00]" : "hover:bg-[#FF4C00]/80"
            }`}
          >
            About Us
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;
