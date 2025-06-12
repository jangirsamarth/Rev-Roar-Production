"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ChevronRight,
  Mountain,
  Camera,
  Sun,
  Cloud,
  ArrowRight,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

// Sample data for destinations
const destinations = [
  {
    id: "ladakh",
    name: "Ladakh",
    tagline: "The Land of High Passes",
    description:
      "Think Pangong Tso's magical hue, the thrill of Khardung La, and the warm smiles of Nubra Valley...",
    fullDescription:
      "Nestled in the northernmost part of India, Ladakh is a land of stark landscapes, ancient monasteries, and vibrant culture. From the world's highest motorable passes to serene lakes that change colors with the sun, Ladakh offers an otherworldly experience that stays with you long after you've left.",
    image: "/Ladakh3.webp?height=1080&width=1920",
    mapLocation: "34.1526° N, 77.5770° E",
    bestTimeToVisit: "June to September",
    altitude: "3,000 - 5,500 meters",
    climate: "Cold desert, extreme temperatures",
    highlights: [
      {
        name: "Pangong Lake",
        description:
          "The stunning blue lake that changes colors throughout the day",
        image: "/Ladakh-featured.webp?height=400&width=600",
      },
      {
        name: "Umiling La Pass",
        description: "One of the world's highest motorable passes at 18,380 ft",
        image: "/umling la pass.JPG?height=400&width=600",
      },
      {
        name: "Nubra Valley",
        description:
          "Known for its sand dunes, double-humped camels, and monasteries",
        image:
          "/nubra.jpg?height=400&width=600",
      },
      {
        name: "Hanle Observatory",
        description:
          "Hanle Observatory in Ladakh is one of the world's highest observatories (4,500m).",
        image:
          "/hanle.jpg?height=400&width=600",
      },
    ],
  },
  {
    id: "spiti",
    name: "Spiti",
    tagline: "The Middle Land",
    description:
      "A remote wonderland with crystal-clear skies, ancient monasteries, and landscapes that belong in a dream...",
    fullDescription:
      "Spiti Valley, often referred to as 'Little Tibet', is a cold desert mountain valley located high in the Himalayas. With its breathtaking landscapes, thousand-year-old monasteries, and clear night skies perfect for stargazing, Spiti offers a journey into both natural beauty and spiritual tranquility.",
    image: "/Spiti tour home page.JPG?height=1080&width=1920",
    mapLocation: "32.2464° N, 78.0349° E",
    bestTimeToVisit: "May to October",
    altitude: "3,800 meters (average)",
    climate: "Cold desert, extreme temperatures",
    highlights: [
      {
        name: "Key Monastery",
        description:
          "A thousand-year-old Buddhist monastery perched on a hilltop",
        image: "/kee-moin.png?height=400&width=600",
      },
      {
        name: "Chandratal Lake",
        description:
          "The 'Moon Lake' known for its crescent shape and crystal clear waters",
        image: "/chandra-tal-2.png?height=400&width=600",
      },
      {
        name: "Chicham Bridge",
        description:
          "India's highest suspension bridge at 4,037 meters, offering stunning views and connecting remote villages over a deep gorge.",
        image: "/chicham.png?height=400&width=600",
      },
      {
        name: "Langza Village",
        description:
          "High-altitude hamlet at 4,400 meters, famous for its giant Buddha statue, fossil-rich terrain, and breathtaking Himalayan views.",
        image: "/lamza.png?height=400&width=600",
      },
    ],
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6 
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    },
  },
};

// Memoized components
const SocialButton = memo(({ href, icon: Icon, className, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${className}`}
    whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
  >
    <Icon className="h-8 w-8 text-white" />
  </motion.a>
));

const DestinationCard = memo(({ destination, index, isActive, onToggle, onExplore }) => (
  <div className="scroll-mt-20" id={destination.id}>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 items-center`}
    >
      {/* Destination Image */}
      <motion.div
        variants={fadeInUp}
        className="w-full md:w-1/2 relative h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl group"
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-${
            index % 2 === 0 ? "r" : "l"
          } from-black/70 via-black/30 to-transparent`}
        />

        <div
          className={`absolute bottom-0 ${
            index % 2 === 0 ? "left-0" : "right-0"
          } p-8 md:p-12 max-w-md`}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-2">
            {destination.name}
          </h2>
          <p className="text-white/90 text-lg">
            {destination.tagline}
          </p>
        </div>
      </motion.div>

      {/* Destination Info */}
      <motion.div variants={fadeInUp} className="w-full md:w-1/2 p-4">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">
          Discover {destination.name}
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          {destination.fullDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoItem icon={MapPin} title="Location" content={destination.mapLocation} />
          <InfoItem icon={Calendar} title="Best Time to Visit" content={destination.bestTimeToVisit} />
          <InfoItem icon={Mountain} title="Altitude" content={destination.altitude} />
          <InfoItem icon={Cloud} title="Climate" content={destination.climate} />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onToggle(destination.id)}
            className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl hover:shadow-orange-500/20"
          >
            {isActive ? "Hide Highlights" : "View Highlights"}
            <ChevronRight
              className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                isActive ? "rotate-90" : ""
              }`}
            />
          </button>

          <button
            onClick={onExplore}
            className="px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
          >
            Explore Tours
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>

    {/* Highlights Section */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 overflow-hidden"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Highlights of {destination.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destination.highlights.map((highlight, idx) => (
              <HighlightCard key={idx} highlight={highlight} index={idx} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

const InfoItem = memo(({ icon: Icon, title, content }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-orange-700 mt-1 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
));

const HighlightCard = memo(({ highlight, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={highlight.image}
        alt={highlight.name}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </div>
    <div className="p-4">
      <h4 className="font-bold text-lg mb-2">{highlight.name}</h4>
      <p className="text-gray-600 text-sm">{highlight.description}</p>
    </div>
  </motion.div>
));

const TravelTipCard = memo(({ icon: Icon, title, content }) => (
  <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-orange-700" />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </motion.div>
));

// Main component
export default function LocationsPage() {
  const [activeDestination, setActiveDestination] = useState(null);

  const handleToggleDestination = useCallback((id) => {
    setActiveDestination(prev => prev === id ? null : id);
  }, []);

  const handleExploreTours = useCallback(() => {
    window.location.href = "/itinerarypage";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pexels-dhruv-jangid-2945224-30255573.webp"
            alt="Mountains background"
            className="object-cover w-full h-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-6 mb-8"
          >
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-center md:text-right"
            >
              DESTINATIONS <br className="hidden md:block" /> WE CALL HOME
            </motion.h1>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="h-20 md:h-32"
            >
              <img
                src="/Logo-White.png"
                alt="Rev & Roar Logo"
                width="200"
                height="100"
                className="h-full w-auto object-contain"
                loading="eager"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl max-w-3xl text-center font-light"
          >
            Discover the breathtaking landscapes and unique cultures of our
            favorite Himalayan destinations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <button
              onClick={handleExploreTours}
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
            >
              <span className="mb-2">Explore Destinations</span>
              <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-16 text-center"
          >
            Our Himalayan Havens
          </motion.h2>

          <div className="space-y-32">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
                isActive={activeDestination === destination.id}
                onToggle={handleToggleDestination}
                onExplore={handleExploreTours}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Travel Tips for Himalayan Adventures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Make the most of your journey with these essential tips for high-altitude travel
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <TravelTipCard
              icon={Mountain}
              title="Altitude Acclimatization"
              content="Take it slow for the first 24-48 hours. Stay hydrated, avoid alcohol, and consider medications like Diamox after consulting your doctor."
            />
            <TravelTipCard
              icon={Sun}
              title="Weather Preparation"
              content="Pack layers! Temperatures can vary drastically between day and night. Always carry a good quality sunscreen, sunglasses, and a hat."
            />
            <TravelTipCard
              icon={Camera}
              title="Photography Tips"
              content="Carry extra batteries as they drain faster in cold. The light is magical during golden hours, and night skies offer incredible stargazing opportunities."
            />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-orange-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Explore These Breathtaking Destinations?
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              Let us guide you through the majestic landscapes of Ladakh and Spiti Valley. Book your adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-orange-700 font-bold rounded-lg hover:bg-orange-50 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                Contact Us
              </a>
              <button
                onClick={handleExploreTours}
                className="px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl border-2 border-white"
              >
                Browse Tours
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        <SocialButton
          href="https://www.instagram.com/revnroar.ig/"
          icon={FaInstagram}
          className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90"
          delay={0.5}
        />
        <SocialButton
          href="https://wa.me/7017775164"
          icon={FaWhatsapp}
          className="bg-green-500 hover:bg-green-600"
          delay={1}
        />
      </div>
    </div>
  );
}
