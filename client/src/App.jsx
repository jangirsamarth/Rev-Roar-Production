import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Enquiry from "./pages/Enquiry";
import AboutUs from "./pages/AboutUs";
import Location from "./pages/Location";
import ContactUs from "./pages/ContactUs";
import ItineraryPage from "./pages/ItineraryPage";
import CustomToursDetails from "./pages/CustomToursDetails";

// Facebook Pixel Component
const FacebookPixel = () => {
  useEffect(() => {
    const fbScript = document.createElement("script");
    fbScript.async = true;
    fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
    fbScript.onload = () => {
      // Define fbq if not already defined
      if (typeof window.fbq !== "function") {
        window.fbq = function () {
          window.fbq.callMethod
            ? window.fbq.callMethod.apply(window.fbq, arguments)
            : window.fbq.queue.push(arguments);
        };
        window.fbq.queue = [];
        window.fbq.loaded = true;
        window.fbq.version = "2.0";
      }
      // Initialize the pixel with your Pixel ID and track the page view
      window.fbq("init", "871419161784479");
      window.fbq("track", "PageView");
    };
    document.head.appendChild(fbScript);
    
    // Optional cleanup if the component ever unmounts
    return () => {
      document.head.removeChild(fbScript);
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

function App() {
  return (
    <>
      <FacebookPixel />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/location" element={<Location />} />
        <Route path="/itinerarypage" element={<ItineraryPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/custom-tours-details" element={<CustomToursDetails />} />
      </Routes>
    </>
  );
}

export default App;
