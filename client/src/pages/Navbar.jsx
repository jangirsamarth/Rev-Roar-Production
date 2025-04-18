"use client"

import React, { useState, useEffect, useCallback, memo } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { X, Menu } from "lucide-react"

// Navigation items - defined outside component to prevent recreation
const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/location", label: "Location" },
  { path: "/itinerarypage", label: "Tours" },
  { path: "/gallery", label: "Gallery" },
  { path: "/enquiry", label: "FAQ" },
  { path: "/about-us", label: "About Us" },
  { path: "/contact", label: "Contact" },
]

// Animation variants
const mobileMenuVariants = {
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 }
}

const navItemsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

// Social media links component
const SocialLinks = memo(({ className = "" }) => (
  <div className={`flex space-x-4 ${className}`}>
    <a
      href="https://www.instagram.com/revnroar.ig/"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full transition-transform hover:scale-110"
      aria-label="Follow us on Instagram"
    >
      <FaInstagram className="w-5 h-5 text-white" aria-hidden="true" />
    </a>
    <a
      href="https://wa.me/7017775164"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-green-500 rounded-full transition-transform hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-5 h-5 text-white" aria-hidden="true" />
    </a>
  </div>
))

SocialLinks.displayName = "SocialLinks"

// NavLink component for consistent styling
const NavLink = memo(({ to, isActive, children, isMobile = false }) => (
  <Link
    to={to}
    className={`
      ${isMobile ? 'block text-lg p-3' : 'text-base lg:text-lg px-3 py-2'} 
      font-medium text-white rounded-lg transition-all duration-300
      ${isActive
        ? "bg-orange-600 shadow-md"
        : isMobile 
          ? "hover:bg-orange-600/60" 
          : "hover:bg-orange-600/80"
      }
    `}
  >
    {children}
  </Link>
))

NavLink.displayName = "NavLink"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Update navbar style on scroll with debounce
  useEffect(() => {
    let timeoutId = null
    
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50)
      }, 100) // Debounce by 100ms
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const isActive = useCallback((path) => {
    return location.pathname === path
  }, [location.pathname])

  // Get current page name for mobile header
  const getCurrentPageName = useCallback(() => {
    const current = NAV_ITEMS.find((item) => isActive(item.path))
    return current ? current.label : "Menu"
  }, [isActive])

  // Render desktop navigation
  const renderDesktopNav = () => (
    <div className="hidden md:flex container mx-auto justify-between items-center px-4 lg:px-8 py-4">
      <Link to="/" className="flex-shrink-0">
        <img
          src="/Logo-White.png"
          alt="Rev & Roar Logo"
          className="h-10 w-auto object-contain"
          width="160"
          height="40"
        />
      </Link>
      <div className="flex space-x-2 lg:space-x-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            isActive={isActive(item.path)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  )

  // Render mobile navigation
  const renderMobileNav = () => (
    <>
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex-shrink-0">
          <img
            src="/Logo-White.png"
            alt="Rev & Roar Logo"
            className="h-8 w-auto object-contain"
            width="128"
            height="32"
          />
        </Link>
        <div className="flex items-center">
          <span className="text-lg font-medium text-white mr-3">
            {getCurrentPageName()}
          </span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-md"
          >
            <motion.div
              className="flex flex-col px-4 py-4 space-y-2"
              initial="hidden"
              animate="visible"
              variants={navItemsContainerVariants}
            >
              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={item.path}
                  variants={navItemVariants}
                >
                  <NavLink
                    to={item.path}
                    isActive={isActive(item.path)}
                    isMobile={true}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                variants={navItemVariants}
                className="pt-4"
              >
                <SocialLinks />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      {renderDesktopNav()}
      {renderMobileNav()}
    </nav>
  )
}

export default memo(Navbar)