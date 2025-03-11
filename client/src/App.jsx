import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Enquiry from "./pages/Enquiry";
import AboutUs from "./pages/AboutUs";
import Location from "./pages/Location";
// import Temp from "./pages/ItineraryPage";
import ContactUs from "./pages/ContactUs";
import ItineraryPage from "./pages/ItineraryPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/location" element={<Location />} />
        <Route path="/itinerarypage" element={<ItineraryPage />} />
        <Route path="/contact" element={<ContactUs />} />

      </Routes>
      </>
  );
}

export default App;
