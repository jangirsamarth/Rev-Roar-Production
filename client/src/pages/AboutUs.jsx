"use client";

import React, { memo } from "react";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  CheckCircle, 
  MapPin, 
  Shield, 
  Users, 
  Bike,
  Zap,
  Heart,
  Navigation
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Memoized components for better performance
const ExperienceCard = memo(({ img, desc, index }) => (
  <motion.div variants={fadeInUp} className="group">
    <div className="relative overflow-hidden rounded-2xl shadow-xl h-[400px] transform transition-all duration-500 group-hover:scale-[1.02]">
      <img
        src={img || "/placeholder.svg"}
        alt={`Experience ${index + 1}`}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        loading={index === 0 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-xl md:text-2xl font-medium text-white">{desc}</p>
      </div>
      <div className="absolute inset-0 border-[8px] border-dashed border-white/30 rounded-2xl pointer-events-none" />
    </div>
  </motion.div>
));
ExperienceCard.displayName = "ExperienceCard";

const AdventureCard = memo(({ adventure, index, reversed }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
  >
    <div className="w-full md:w-2/5">
      <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
        <img
          src={adventure.img || "/spiti-.webp"}
          alt={adventure.img_tag}
          className="object-cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
          {adventure.icon}
          <span className="font-bold text-gray-800">{adventure.img_tag}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xl font-medium text-white">{adventure.desc}</p>
        </div>
      </div>
    </div>

    <div className="w-full md:w-3/5 bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">{adventure.img_tag}</h3>
      <ul className="space-y-4">
        {adventure.info.map((info, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-orange-700 flex-shrink-0 mt-1" aria-hidden="true" />
            <p className="text-lg text-gray-700">{info}</p>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
));
AdventureCard.displayName = "AdventureCard";

const FeatureCard = memo(({ icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
  >
    {icon}
    <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
    <p className="text-lg text-gray-700">{description}</p>
  </motion.div>
));
FeatureCard.displayName = "FeatureCard";

const SafetyCard = memo(({ icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
  >
    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
    <p className="text-lg text-gray-700">{description}</p>
  </motion.div>
));
SafetyCard.displayName = "SafetyCard";

const ContactMethod = memo(({ icon, title, contact, href }) => (
  <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
    {icon}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <a
      href={href}
      className="text-xl text-orange-300 hover:text-orange-200 transition-colors"
    >
      {contact}
    </a>
  </motion.div>
));
ContactMethod.displayName = "ContactMethod";

const DestinationSection = memo(({ name, image, description, top }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    className="relative h-[80vh] w-full overflow-hidden"
  >
    <img
      src={image}
      alt={name}
      className="object-cover"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      loading="lazy"
    />
    <div className={`absolute inset-0 bg-gradient-to-${top ? 'b' : 't'} from-black/70 to-transparent`} />
    <div className={`absolute ${top ? 'top-0' : 'bottom-0'} left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row items-${top ? 'start' : 'end'} md:items-center justify-between`}>
      {top ? (
        <>
          <p className="text-lg md:text-2xl text-white max-w-md order-2 md:order-1">
            {description}
          </p>
          <h3 className="text-5xl md:text-[160px] font-bold text-white mb-4 md:mb-0 order-1 md:order-2">{name}</h3>
        </>
      ) : (
        <>
          <h3 className="text-5xl md:text-[160px] font-bold text-white mb-4 md:mb-0">{name}</h3>
          <p className="text-lg md:text-2xl text-white max-w-md">
            {description}
          </p>
        </>
      )}
    </div>
  </motion.div>
));
DestinationSection.displayName = "DestinationSection";

const SocialButtons = memo(() => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
    <motion.a
      href="https://www.instagram.com/revnroar.ig/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-lg hover:opacity-90 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      aria-label="Follow us on Instagram"
    >
      <FaInstagram className="h-8 w-8 text-white" aria-hidden="true" />
    </motion.a>

    <motion.a
      href="https://wa.me/7017775164"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8 text-white" aria-hidden="true" />
    </motion.a>
  </div>
));
SocialButtons.displayName = "SocialButtons";

// Data constants
const EXPERIENCES = [
  {
    img: "/bike-tour.JPG?height=400&width=600",
    desc: "The hum of your bike engine as you conquer Khardung LA.",
  },
  {
    img: "/group-tour.webp?height=400&width=600",
    desc: "A shared laugh with friends under the starry skies of Spiti.",
  },
  {
    img: "/bike-gallery.webp?height=400&width=600",
    desc: "Thrilling High-altitude Passes with Expert Guides.",
  },
];

const ADVENTURES = [
  {
    img: "/bike-tour.JPG?height=400&width=600",
    img_tag: "Bike Trips",
    desc: "Feel the roar of the engine. Feel alive.",
    icon: <Bike className="w-10 h-10" aria-hidden="true" />,
    info: [
      "Explore Ladakh or Spiti on a Royal Enfield or Himalayan.",
      "Safety first! We've got expert guides and a backup vehicle at every step.",
      "AMS prevention stops and detailed briefings because your health matters.",
    ],
  },
  {
    img: "/temppo.webp?height=400&width=600",
    img_tag: "Tempo Traveler Trips",
    desc: "Adventure is for everyone comfort included.",
    icon: <Users className="w-10 h-10" aria-hidden="true" />,
    info: [
      "Perfect for families, friends, or groups who want to explore the mountains without the hassle.",
      "Chill with your crew while we handle the rough terrains.",
    ],
  },
];

const FEATURES = [
  {
    icon: <Shield className="w-16 h-16 text-orange-700 mb-6" aria-hidden="true" />,
    title: "Safety First",
    description: "Backup vehicles, AMS prevention stops, and experienced guides to handle every challenge."
  },
  {
    icon: <Users className="w-16 h-16 text-orange-700 mb-6" aria-hidden="true" />,
    title: "Customized Fun",
    description: "Whether you're a thrill-seeker or prefer relaxed exploration, we tailor trips to your vibe."
  },
  {
    icon: <MapPin className="w-16 h-16 text-orange-700 mb-6" aria-hidden="true" />,
    title: "Local Expertise",
    description: "We know these mountains like the back of our hand. Expect secret spots, authentic experiences, and insider stories."
  },
];

const SAFETY_FEATURES = [
  {
    icon: <Zap className="h-8 w-8 text-orange-700" aria-hidden="true" />,
    title: "Backup Vehicles",
    description: "Always there to carry your luggage or assist in emergencies."
  },
  {
    icon: <Heart className="h-8 w-8 text-orange-700" aria-hidden="true" />,
    title: "AMS Prevention",
    description: "Dedicated acclimatization days and expert guidance to keep you healthy."
  },
  {
    icon: <Users className="h-8 w-8 text-orange-700" aria-hidden="true" />,
    title: "Trained Team",
    description: "Guides equipped with first aid and local knowledge."
  },
];

const DESTINATIONS = [
  {
    name: "Ladakh",
    image: "/laddakh.webp?height=1080&width=1920",
    description: "Think Pangong Tso's magical hue, the thrill of Khardung La, and the warm smiles of Nubra Valley...",
    top: false
  },
  {
    name: "Spiti",
    image: "/Spiti tour home page.webp?height=1080&width=1920",
    description: "A remote wonderland with crystal-clear skies, ancient monasteries, and landscapes that belong in a dream...",
    top: true
  }
];

const CONTACT_METHODS = [
  {
    icon: <FaEnvelope className="h-12 w-12 mx-auto mb-4 text-orange-400" aria-hidden="true" />,
    title: "Email Us",
    contact: "info@revnroar.com",
    href: "mailto:info@revnroar.com"
  },
  {
    icon: <FaPhone className="h-12 w-12 mx-auto mb-4 text-orange-400" aria-hidden="true" />,
    title: "Call Us",
    contact: "+91-7017775164",
    href: "tel:+917017775164"
  }
];

// Main component
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/mountain-view.webp?height=1080&width=1920"
            alt="Mountains background"
            className="object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center mb-8"
          >
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mr-4"
            >
              ABOUT
            </motion.h1>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="h-24 md:h-32"
            >
              <img
                src="/Logo-White.png?height=200&width=400"
                alt="Rev & Roar Logo"
                width="200"
                height="100"
                className="h-full w-auto object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-3xl max-w-3xl text-center font-light"
          >
            Crafting unforgettable Himalayan adventures since 2015
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <a href="#intro" className="text-white animate-bounce" aria-label="Scroll down">
            <ChevronRight className="w-10 h-10 rotate-90" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* Intro Section */}
      <section id="intro" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-800">
            At Rev & Roar, we don't just plan trips—<span className="text-orange-700 italic"> we craft life-changing experiences.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700">Picture this:</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {EXPERIENCES.map((experience, index) => (
            <ExperienceCard 
              key={index} 
              img={experience.img} 
              desc={experience.desc} 
              index={index} 
            />
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-5xl mx-auto"
        >
          We specialize in curating personalized adventures to Ladakh and Spiti that are exciting, safe, and full of stories you'll cherish forever. Whether you're a solo traveler, a group of friends, a college gang, or a corporate team, we ensure every journey is as unique as you are.
        </motion.p>
      </section>

      {/* Our Adventures Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-16 text-gray-800 inline-block relative"
          >
            OUR ADVENTURES
            <span className="absolute -bottom-3 left-0 w-1/3 h-1 bg-orange-600"></span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-20"
          >
            {ADVENTURES.map((adventure, index) => (
              <AdventureCard 
                key={index} 
                adventure={adventure} 
                index={index} 
                reversed={index % 2 !== 0} 
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 inline-block relative">
              Why Travel With Us
              <span className="absolute -bottom-3 left-0 w-1/3 h-1 bg-orange-600"></span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl">
              We're not just another travel company. We're your partners in adventure. Here's why our customers swear by us:
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {FEATURES.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold mb-8 text-gray-800 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
        >
          DESTINATIONS WE CALL HOME
        </motion.h2>

        {DESTINATIONS.map((destination, index) => (
          <DestinationSection 
            key={index}
            name={destination.name}
            image={destination.image}
            description={destination.description}
            top={destination.top}
          />
        ))}
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-orange-600 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-5xl mx-auto text-center"
        >
          <svg className="w-16 h-16 mx-auto mb-6 text-orange-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="italic text-2xl md:text-4xl font-light">
            "It's not just the destination—it's how you get there. With Rev & Roar, every mile is a memory."
          </p>
        </motion.div>
      </section>

      {/* Safety & Support Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 inline-block relative">
              SAFETY & SUPPORT
              <span className="absolute -bottom-3 left-0 w-1/3 h-1 bg-orange-600"></span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700">
              Adventure doesn't have to mean taking unnecessary risks.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {SAFETY_FEATURES.map((feature, index) => (
              <SafetyCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready for Your Adventure?</h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Contact us today to book your dream Himalayan journey or customize your own itinerary.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {CONTACT_METHODS.map((method, index) => (
              <ContactMethod
                key={index}
                icon={method.icon}
                title={method.title}
                contact={method.contact}
                href={method.href}
              />
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <a
              href="http://www.revnroar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-full text-xl hover:bg-orange-100 transition-colors"
            >
              <FaGlobe className="h-5 w-5" aria-hidden="true" />
              Visit Our Website
            </a>
          </motion.div>
        </div>
      </section>

      {/* Fixed Social Media Buttons */}
      <SocialButtons />
    </div>
  );
}