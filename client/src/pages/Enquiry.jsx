"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Info,
  Calendar,
  Shield,
  MapPin,
  Bike,
  Users,
  Clock,
  DollarSign,
  Compass,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Filter,
  Star,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// FAQ categories for better organization
const CATEGORIES = [
  {
    id: "general",
    name: "General Information",
    icon: <Info className="w-5 h-5" />,
  },
  { id: "trips", name: "Trip Details", icon: <Compass className="w-5 h-5" /> },
  {
    id: "safety",
    name: "Safety & Support",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "booking",
    name: "Booking & Policies",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: "popular",
    name: "Most Asked Questions",
    icon: <Star className="w-5 h-5" />,
  },
];

// Organized FAQs by category
const FAQS_BY_CATEGORY = {
  general: [
    {
      id: 1,
      question: "What kind of trips does Rev & Roar specialize in?",
      answer:
        "We specialize in thrilling bike expeditions, comfortable tempo traveler tours, and group adventures to Ladakh and Spiti. Whether you're a solo rider, a family, a corporate team, or a group of college friends, we create trips tailored just for you!",
      icon: <Compass className="w-5 h-5" />,
      popular: true,
    },
    {
      id: 9,
      question: "What kind of accommodation can I expect?",
      answer:
        "We offer a mix of cozy hotels, guesthouses, and campsites, depending on the location. Rest assured, we prioritize clean, comfortable, and safe stays to ensure a great experience.",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 6,
      question: "What is the best time to visit Ladakh and Spiti?",
      answer: `• Ladakh: The ideal time is between May and September, when the roads are open, and the weather is pleasant.
• Spiti: Best visited from June to October for bike trips or tempo tours, as the valleys bloom during these months.`,
      icon: <Calendar className="w-5 h-5" />,
      popular: true,
    },
    {
      id: 7,
      question: "What should I pack for a trip to Ladakh or Spiti?",
      answer: `Here's a quick checklist:
• Warm layers, including thermal wear and waterproof jackets.
• Comfortable, sturdy shoes.
• Gloves, woolen socks, and caps.
• Sunglasses and sunscreen for high-altitude sun exposure.
• Personal medicines, including Diamox (for AMS).
• A power bank and camera to capture the magic!

We'll provide a detailed packing guide once you book with us.`,
      icon: <Compass className="w-5 h-5" />,
    },
  ],
  trips: [
    {
      id: 2,
      question: "Do I need prior experience for a bike trip?",
      answer:
        "Not at all! Our bike trips are designed for everyone, from first-timers to seasoned riders. We provide a pre-ride briefing and basic training to ensure you're comfortable and confident before hitting the road.",
      icon: <Bike className="w-5 h-5" />,
      popular: true,
    },
    {
      id: 3,
      question: "What's included in your packages?",
      answer: `Our packages typically include:
• Accommodation
• Meals (Breakfast & Dinner)
• Bike rentals or tempo traveler
• Backup vehicle for emergencies and luggage
• Expert guides and mechanics
• AMS prevention support
• Permits and tolls

For specific details, check out the itinerary of your chosen package.`,
      icon: <DollarSign className="w-5 h-5" />,
      popular: true,
    },
    {
      id: 8,
      question: "Do you allow pillion riders on bike trips?",
      answer:
        "If you're not ready to ride solo, you can join as a pillion rider. It's a fantastic way to enjoy the adventure without worrying about handling a bike. (Terms and conditions applied)",
      icon: <Bike className="w-5 h-5" />,
    },
    {
      id: 10,
      question: "Can I customize a trip?",
      answer:
        "Yes, we offer fully customizable tours! Whether it's a specific itinerary, a mix of adventure and leisure, or a group size, we'll design the perfect trip for your needs. Just share your preferences with us, and we'll handle the rest.",
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 11,
      question: "Is there any age limit for these trips?",
      answer: `• Bike trips: Riders must be at least 18 years old with a valid driver's license.
• Tempo tours: Perfect for all ages, including families with kids or seniors who prefer a comfortable journey.`,
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 16,
      question: "Can I bring my own bike for a bike trip?",
      answer:
        "Of course! If you're comfortable riding your own bike, feel free to bring it along. We'll assist with servicing and ensure your bike is road-ready for the journey.",
      icon: <Bike className="w-5 h-5" />,
    },
    {
      id: 17,
      question: "What kind of group sizes do you manage?",
      answer: `We cater to all group sizes:
• Small, intimate trips for solo riders or friends.
• Larger groups for colleges, corporates, or families.
No group is too big or small—we make it work!`,
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 22,
      question: "How many kilometers do we cover each day on bike trips?",
      answer: `Daily riding distance varies by trip and terrain:
• On average, we cover 150-200 km per day on good roads
• In challenging terrains like high mountain passes, we might cover 80-120 km
• We always plan appropriate breaks and photo stops
• The pace is comfortable and enjoyable, not rushed`,
      icon: <Bike className="w-5 h-5" />,
      new: true,
    },
  ],
  safety: [
    {
      id: 4,
      question:
        "What is Acute Mountain Sickness (AMS), and how do you prevent it?",
      answer: `AMS occurs due to reduced oxygen levels at high altitudes. We take several precautions, including:
• Proper acclimatization stops.
• A gradual increase in altitude.
• Continuous monitoring of your health by trained guides.
We also provide medical support if required.`,
      icon: <Shield className="w-5 h-5" />,
      popular: true,
    },
    {
      id: 5,
      question: "What kind of backup support is provided during trips?",
      answer:
        "We ensure a backup vehicle is always present to carry your luggage, provide assistance, and handle emergencies. Our team includes mechanics and first-aid-trained guides to address any issues on the go.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 13,
      question: "What happens if the weather disrupts the trip?",
      answer:
        "Mountain weather can be unpredictable, but your safety is our priority. If weather conditions disrupt the itinerary, we'll adjust the plan to ensure you still have a safe and enjoyable experience.",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: 15,
      question: "How do you ensure safety during bike trips?",
      answer: `Safety is non-negotiable at Rev & Roar. Here's how we ensure it:
• Pre-trip bike checks and basic training.
• Mandatory safety gear (helmet, gloves, etc.).
• Experienced guides and mechanics.
• Backup vehicle for emergencies.
• Strict adherence to AMS prevention guidelines.`,
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 18,
      question: "Do you provide travel insurance?",
      answer:
        "While we don't provide travel insurance directly, we highly recommend purchasing one before your trip. It should cover high-altitude travel, medical emergencies, and trip cancellations.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 21,
      question: "What medical facilities are available during the journey?",
      answer: `We take comprehensive health precautions:
• All guides are trained in wilderness first aid
• We carry fully-equipped first aid kits on all trips
• Our routes pass through towns with medical facilities when possible
• For remote areas, we maintain emergency evacuation protocols
• We're connected with local medical services throughout our journey routes`,
      icon: <CheckCircle className="w-5 h-5" />,
      new: true,
    },
  ],
  booking: [
    {
      id: 12,
      question: "How do I book a trip?",
      answer: `Booking with us is simple!
1. Browse our packages on the website.
2. Choose your preferred trip.
3. Contact us via phone, email, or WhatsApp to finalize details.
4. Secure your spot with a deposit, and you're all set!`,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 14,
      question: "What's your cancellation and refund policy?",
      answer: `We understand that plans can change. Our cancellation policy is as follows:
• 30+ days before trip: No refund (but can shift dates)
• 15-30 days: No refund

For more details, please refer to our full terms and conditions.`,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: 20,
      question: "Do you offer any discounts for groups or early bookings?",
      answer: `Yes! We have several discount options:
• Early Bird: Book 3+ months in advance for special rates
• Group Discounts: Groups of 5+ riders receive discounted packages
• Return Travelers: Past customers enjoy loyalty discounts
• Seasonal Promotions: Watch for special offers during off-peak seasons

Contact us directly for the current discount details applicable to your trip.`,
      icon: <DollarSign className="w-5 h-5" />,
      new: true,
    },
    {
      id: 23,
      question: "What payment methods do you accept?",
      answer: `We offer multiple convenient payment options:
• Bank Transfer (NEFT/IMPS/RTGS)
• UPI Payments
• Credit/Debit Cards
• International Wire Transfers for overseas customers

We'll provide the relevant payment details after you confirm your booking.`,
      icon: <DollarSign className="w-5 h-5" />,
      new: true,
    },
  ],
  popular: [], // Will be filled programmatically
};

// Add popular FAQs from other categories to the "popular" category
Object.keys(FAQS_BY_CATEGORY).forEach((category) => {
  if (category !== "popular") {
    FAQS_BY_CATEGORY[category].forEach((faq) => {
      if (faq.popular) {
        FAQS_BY_CATEGORY.popular.push(faq);
      }
    });
  }
});

// FAQ Item Component
const FAQItem = React.memo(({ faq, isActive, onToggle, reference }) => {
  return (
    <div
      ref={reference}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isActive ? "shadow-md border-blue-200" : "border-gray-200"
      } ${faq.new ? "relative" : ""}`}>
      {faq.new && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
          NEW
        </div>
      )}

      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between p-5 text-left"
        aria-expanded={isActive}>
        <div className="flex items-start gap-3 pr-4">
          <div className="mt-1 text-orange-700 flex-shrink-0">{faq.icon}</div>
          <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
        </div>
        <div
          className={`text-orange-700 transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}>
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden">
            <div className="p-5 pt-0 border-t border-gray-200">
              <div className="text-gray-600 whitespace-pre-line">
                {faq.answer.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className={`mb-2 ${
                      line.trim().startsWith("•")
                        ? "pl-5 relative before:content-['•'] before:absolute before:left-0"
                        : ""
                    }`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FAQItem.displayName = "FAQItem";

// Category Tab Component
const CategoryTab = React.memo(({ category, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-orange-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      aria-selected={isActive}
      role="tab">
      {category.icon}
      <span className="font-medium">{category.name}</span>
    </button>
  );
});

CategoryTab.displayName = "CategoryTab";

// Quick Contact Box Component
const QuickContactBox = React.memo(() => {
  return (
    <div className="mt-8 bg-gray-100 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Need More Help?</h3>
      <p className="text-gray-600 mb-4">
        Can't find what you're looking for? Contact us directly:
      </p>
      <div className="space-y-3">
        <a
          href="tel:+917017775164"
          className="flex items-center gap-3 text-orange-700 hover:text-orange-800 transition-colors">
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>+91 7017775164</span>
        </a>
        <a
          href="mailto:info@revnroar.com"
          className="flex items-center gap-3 text-orange-700 hover:text-orange-800 transition-colors">
          <Mail className="w-5 h-5" aria-hidden="true" />
          <span>info@revnroar.com</span>
        </a>
        <a
          href="https://wa.me/917017775164"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-orange-700 hover:text-orange-800 transition-colors">
          <MessageSquare className="w-5 h-5" aria-hidden="true" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
});

QuickContactBox.displayName = "QuickContactBox";

// Search Results Component
const SearchResults = React.memo(({ results, searchTerm, onResultClick }) => {
  if (results.length === 0 && searchTerm.length > 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-20 p-4 text-center">
        <p className="text-gray-600">No results found for "{searchTerm}"</p>
        <p className="text-sm text-gray-500 mt-1">
          Try different keywords or browse the categories below
        </p>
      </motion.div>
    );
  }

  if (results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto">
      <div className="p-2">
        {results.map((result) => (
          <button
            key={result.id}
            onClick={() => onResultClick(result.id, result.category)}
            className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-start gap-3">
            {result.icon}
            <div>
              <p className="font-medium text-gray-800">{result.question}</p>
              <p className="text-sm text-gray-500 line-clamp-1">
                {result.answer.split("\n")[0]}
              </p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
});

SearchResults.displayName = "SearchResults";

// Social Media Buttons Component
const SocialMediaButtons = React.memo(() => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-4">
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
        aria-label="Visit our Instagram page">
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
        aria-label="Contact us on WhatsApp">
        <FaWhatsapp className="h-8 w-8 text-white" aria-hidden="true" />
      </motion.a>
    </div>
  );
});

SocialMediaButtons.displayName = "SocialMediaButtons";

// Main Enquiry Page Component
const EnquiryPage = () => {
  // State hooks
  const [activeCategory, setActiveCategory] = useState("general");
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Refs
  const faqRefs = useRef({});
  const searchTimeoutRef = useRef(null);

  // Find which category a FAQ belongs to
  const findFaqCategory = useCallback((id) => {
    for (const [category, faqs] of Object.entries(FAQS_BY_CATEGORY)) {
      if (category !== "popular" && faqs.some((faq) => faq.id === id)) {
        return category;
      }
    }
    return "general";
  }, []);

  // Handle toggle of FAQ item
  const handleToggle = useCallback(
    (id) => {
      setActiveIndex((prev) => {
        // If closing an item, don't update recently viewed
        if (prev === id) return null;

        // If opening a new item, update recently viewed
        const category = findFaqCategory(id);
        const faq = FAQS_BY_CATEGORY[category].find((f) => f.id === id);

        if (faq) {
          setRecentlyViewed((prev) => {
            // Create new array without this item if it exists
            const filtered = prev.filter((item) => item.id !== id);
            // Add item to the beginning (most recent)
            return [
              { id, question: faq.question, category },
              ...filtered,
            ].slice(0, 3);
          });
        }

        return id;
      });
    },
    [findFaqCategory]
  );

  // Handle search with debounce
  const handleSearch = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (term.length > 2) {
      // Debounce search to avoid excessive processing
      searchTimeoutRef.current = setTimeout(() => {
        setIsSearching(true);

        // Create all FAQs with category information
        const allFaqs = Object.entries(FAQS_BY_CATEGORY).reduce(
          (acc, [category, faqs]) => {
            if (category !== "popular") {
              return [...acc, ...faqs.map((faq) => ({ ...faq, category }))];
            }
            return acc;
          },
          []
        );

        // Filter FAQs based on search term
        const results = allFaqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(term.toLowerCase()) ||
            faq.answer.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(results);
      }, 300); // 300ms debounce
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, []);

  // Scroll to a specific FAQ
  const scrollToFaq = useCallback((id, category) => {
    setActiveCategory(category);
    setActiveIndex(id);
    setSearchTerm("");
    setIsSearching(false);

    // Small delay to ensure the category has changed
    setTimeout(() => {
      if (faqRefs.current[id]) {
        faqRefs.current[id].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Memoize filtered FAQs based on active category
  const currentFaqs = useMemo(() => {
    return FAQS_BY_CATEGORY[activeCategory] || [];
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/mountain-view.webp?height=1080&width=1920"
            alt="Mountains background"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            className="object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white">
              FAQ
            </motion.h1>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="h-16 md:h-24">
              <img
                src="/Logo-White.png?height=200&width=400"
                alt="Rev & Roar Logo"
                width="120"
                height="60"
                className="h-full w-auto object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl max-w-3xl text-center text-white/90">
            Find answers to your questions about our adventures and services
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 w-full max-w-2xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full py-3 px-5 pl-12 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
                aria-label="Search frequently asked questions"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5"
                aria-hidden="true"
              />
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearching && (
                <SearchResults
                  results={searchResults}
                  searchTerm={searchTerm}
                  onResultClick={scrollToFaq}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-24">
              {/* Category Tabs */}
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                FAQ Categories
              </h2>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <CategoryTab
                    key={category.id}
                    category={category}
                    isActive={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                  />
                ))}
              </div>

              {/* Recently Viewed FAQs */}
              {recentlyViewed.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Clock
                      className="w-5 h-5 text-gray-600"
                      aria-hidden="true"
                    />
                    Recently Viewed
                  </h3>
                  <div className="space-y-2">
                    {recentlyViewed.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToFaq(item.id, item.category)}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                        {item.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Contact Box */}
              <QuickContactBox />

              {/* New Tour Booking Callout */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="mt-8 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4">
                  Ready to Book Your Adventure?
                </h3>
                <p className="text-white/90 mb-4 text-sm">
                  Find the perfect tour for your next Himalayan journey. Browse
                  our curated selection of adventures.
                </p>
                <a
                  href="/itinerarypage"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors shadow-sm">
                  View Tours
                  <FaArrowRight className="text-sm" aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="md:w-3/4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.name ||
                    "Frequently Asked Questions"}
                </h2>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-700">
                    <Filter className="w-4 h-4" />
                    Clear Search
                  </button>
                )}
              </div>

              {currentFaqs.map((faq) => (
                <motion.div key={faq.id} variants={fadeInUp}>
                  <FAQItem
                    faq={faq}
                    isActive={activeIndex === faq.id}
                    onToggle={() => handleToggle(faq.id)}
                    reference={(el) => (faqRefs.current[faq.id] = el)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Social Media Buttons */}
      <SocialMediaButtons />
    </div>
  );
};

export default EnquiryPage;
