// src/components/Gallery.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiArrowLeftWideLine, RiArrowRightWideFill } from "react-icons/ri";

// Gallery images (stamp & logo)
// import stampImage from "/stamp/stamp-11.png"; // Update this path
// import logoImage from "/stamp/stamp-11.png";   // Update this path

// Slider images
import img1 from "/pexels-tashi-namgyal-19161220-6492212.webp"; // Update this path
import img2 from "/pexels-julia-volk-5204921.webp"; // Update this path
import img3 from "/pexels-dhruv-jangid-2945224-30255573.webp"; // Update this path

const sliderImages = [img1, img2, img3];
const quotes = [
  "Thrilling High-altitude Passes with Expert Guides.",
  "The hum of your bike engine as you conquer Khardung LA.",
  "A shared laugh with friends under the starry skies of Spiti.",
];

function Gallery() {
  // Slider state & handlers
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="gallery-container">
      {/* Gallery Section */}
      {/* <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">GALLERY</h1>
        <p className="text-xl mb-8">Check out our gallery!</p>

        <div className="flex gap-8">
          <div className="image-container relative">
            <img
              src={stampImage}
              alt="Stamp"
              className="w-64 h-64 object-cover rounded-md border-4 border-black"
            />
            <img
              src={logoImage}
              alt="Rev & Roar Logo"
              className="absolute top-2 right-2 w-16 h-16"
            />
            <p className="text-center mt-2">Ladakh</p>
          </div>

          <div className="image-container relative">
            <img
              src={stampImage}
              alt="Stamp"
              className="w-64 h-64 object-cover rounded-md border-4 border-black"
            />
            <img
              src={logoImage}
              alt="Rev & Roar Logo"
              className="absolute top-2 right-2 w-16 h-16"
            />
            <p className="text-center mt-2">Spiti</p>
          </div>
        </div>
      </div> */}

      {/* Slider Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[750px] overflow-hidden bg-black flex items-center justify-center">
        <div className="relative w-full h-full flex items-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-10 z-10 text-white text-3xl sm:text-5xl cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <RiArrowLeftWideLine />
          </button>

          {/* Slider Images */}
          <div className="w-full h-full overflow-hidden relative">
            <motion.div
              className="flex h-full"
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              {sliderImages.map((img, i) => (
                <div key={i} className="w-full flex-shrink-0 relative">
                  <img
                    src={img}
                    alt={`Slide ${i}`}
                    className="w-full h-full object-cover"
                  />
                  {i === index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-4">
                      <p className="text-white text-base sm:text-2xl md:text-[52px] font-normal font-mono text-center px-2 leading-[60px]">
                        {quotes[i]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-10 z-10 text-white text-3xl sm:text-5xl cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <RiArrowRightWideFill />
          </button>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {sliderImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
