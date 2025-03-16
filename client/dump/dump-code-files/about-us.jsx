import React, { useState } from "react";
"use client";
import { motion } from "framer-motion";
// import Image from "next/image"
import { ChevronRight, CheckCircle, MapPin, Shield, Users, Bike } from "lucide-react";

export default function AboutUs() {
  const cardInfo = [
    {
      img: "/placeholder.svg?height=400&width=600",
      desc: "The hum of your bike engine as you conquer Khardung LA.",
    },
    {
      img: "/placeholder.svg?height=400&width=600",
      desc: "A shared laugh with friends under the starry skies of Spiti.",
    },
    {
      img: "/placeholder.svg?height=400&width=600",
      desc: "Thrilling High-altitude Passes with Expert Guides.",
    },
  ];

  const adventures = [
    {
      img: "/placeholder.svg?height=400&width=600",
      img_tag: "Bike Trips",
      desc: "Feel the roar of the engine. Feel alive.",
      icon: <Bike className="w-10 h-10" />,
      info: [
        "Explore Ladakh or Spiti on a Royal Enfield or Himalayan.",
        "Safety first! We've got expert guides and a backup vehicle at every step.",
        "AMS prevention stops and detailed briefings because your health matters.",
      ],
    },
    {
      img: "/placeholder.svg?height=400&width=600",
      img_tag: "Tempo Traveler Trips",
      desc: "Adventure is for everyone comfort included.",
      icon: <Users className="w-10 h-10" />,
      info: [
        "Perfect for families, friends, or groups who want to explore the mountains without the hassle.",
        "Chill with your crew while we handle the rough terrains.",
      ],
    },
    {
      img: "/placeholder.svg?height=400&width=600",
      img_tag: "Corporate & College Tours",
      desc: "From icebreaker activities to adrenaline-pumping adventures.",
      icon: <Users className="w-10 h-10" />,
      info: [
        "Boost team spirit with fun challenges and bonding experiences.",
        "Safe, well-organized itineraries for large groups.",
      ],
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Mountains background"
            className="object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/30" />
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
                src="/placeholder.svg?height=200&width=400"
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
          <a href="#intro" className="text-white animate-bounce">
            <ChevronRight className="w-10 h-10 rotate-90" />
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
            At Rev & Roar, we don't just plan trips—<span className="text-orange-600 italic"> we craft life-changing experiences.</span>
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
          {cardInfo.map((card, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl h-[400px] transform transition-all duration-500 group-hover:scale-[1.02]">
                <img
                  src={card.img || "/placeholder.svg"}
                  alt={`Experience ${index + 1}`}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xl md:text-2xl font-medium text-white">{card.desc}</p>
                </div>
                <div className="absolute inset-0 border-[8px] border-dashed border-white/30 rounded-2xl pointer-events-none" />
              </div>
            </motion.div>
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
            {adventures.map((adventure, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="w-full md:w-2/5">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                    <img
                      src={adventure.img || "/placeholder.svg"}
                      alt={adventure.img_tag}
                      className="object-cover"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                        <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <p className="text-lg text-gray-700">{info}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <Shield className="w-16 h-16 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Safety First</h3>
              <p className="text-lg text-gray-700">
                Backup vehicles, AMS prevention stops, and experienced guides to handle every challenge.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <Users className="w-16 h-16 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Customized Fun</h3>
              <p className="text-lg text-gray-700">
                Whether you're a thrill-seeker or prefer relaxed exploration, we tailor trips to your vibe.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <MapPin className="w-16 h-16 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Local Expertise</h3>
              <p className="text-lg text-gray-700">
                We know these mountains like the back of our hand. Expect secret spots, authentic experiences, and insider stories.
              </p>
            </motion.div>
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

        {/* Ladakh */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative h-[80vh] w-full overflow-hidden"
        >
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Ladakh"
            className="object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row items-end md:items-center justify-between">
            <h3 className="text-5xl md:text-8xl font-bold text-white mb-4 md:mb-0">Ladakh</h3>
            <p className="text-lg md:text-xl text-white max-w-md">
              Think Pangong Tso's magical hue, the thrill of Khardung La, and the warm smiles of Nubra Valley...
            </p>
          </div>
        </motion.div>

        {/* Spiti */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative h-[80vh] w-full overflow-hidden"
        >
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Spiti"
            className="object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute top-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between">
            <p className="text-lg md:text-xl text-white max-w-md order-2 md:order-1">
              A remote wonderland with crystal-clear skies, ancient monasteries, and landscapes that belong in a dream...
            </p>
            <h3 className="text-5xl md:text-8xl font-bold text-white mb-4 md:mb-0 order-1 md:order-2">Spiti</h3>
          </div>
        </motion.div>
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
          <svg className="w-16 h-16 mx-auto mb-6 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
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
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Backup Vehicles</h3>
              <p className="text-lg text-gray-700">Always there to carry your luggage or assist in emergencies.</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">AMS Prevention</h3>
              <p className="text-lg text-gray-700">
                Dedicated acclimatization days and expert guidance to keep you healthy.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Trained Team</h3>
              <p className="text-lg text-gray-700">Guides equipped with first aid and local knowledge.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900 text-white">
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
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Email Us</h3>
              <a
                href="mailto:info@revnroar.com"
                className="text-xl text-orange-300 hover:text-orange-200 transition-colors"
              >
                info@revnroar.com
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Call Us</h3>
              <a href="tel:+917017775164" className="text-xl text-orange-300 hover:text-orange-200 transition-colors">
                +91-7017775164
              </a>
            </motion.div>
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
              className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-full text-xl hover:bg-orange-700 transition-colors"
            >
              Visit Our Website
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
