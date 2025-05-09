import React, { useState, useContext, createContext, memo } from "react";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  Camera,
  Check,
  ChevronRight,
  Compass,
  BikeIcon as Motorcycle,
  Phone,
  Shield,
} from "lucide-react";

// ------------------------
// Inline UI Component Definitions - Memoized for better performance
// ------------------------

// Accordion
const Accordion = memo(({ children, className }) => {
  return <div className={className}>{children}</div>;
});
Accordion.displayName = "Accordion";

const AccordionItem = memo(({ children }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="border-b">
      {React.Children.map(children, (child) => {
        if (child && child.type && child.type.displayName === "AccordionTrigger") {
          return React.cloneElement(child, { open, setOpen });
        }
        if (child && child.type && child.type.displayName === "AccordionContent") {
          return open ? child : null;
        }
        return child;
      })}
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = memo(({ children, open, setOpen, className }) => {
  return (
    <button
      className={`w-full text-left p-2 flex justify-between items-center ${className || ""}`}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
    >
      <span>{children}</span>
      <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>
        <ChevronRight className="h-5 w-5" />
      </span>
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = memo(({ children, className }) => {
  return <div className={`p-2 ${className || ""}`}>{children}</div>;
});
AccordionContent.displayName = "AccordionContent";

// Alert
const Alert = memo(({ children, className }) => {
  return (
    <div className={`p-4 border rounded ${className || ""}`}>{children}</div>
  );
});
Alert.displayName = "Alert";

const AlertDescription = memo(({ children, className }) => {
  return <div className={`text-sm ${className || ""}`}>{children}</div>;
});
AlertDescription.displayName = "AlertDescription";

// Badge
const Badge = memo(({ children, className, variant }) => {
  let baseClass = "inline-block px-2 py-1 text-xs rounded";
  if (variant === "outline") baseClass += " border";
  return <span className={`${baseClass} ${className || ""}`}>{children}</span>;
});
Badge.displayName = "Badge";

// Button
const Button = memo(({ children, className, variant, size, ...props }) => {
  let baseClass = "px-4 py-2 rounded transition-colors";
  if (variant === "outline") {
    baseClass += " border";
  } else {
    baseClass += " bg-blue-500 text-white";
  }
  if (size === "lg") {
    baseClass += " text-lg";
  }
  return (
    <button className={`${baseClass} ${className || ""}`} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

// Card Components
const Card = memo(({ children, className }) => {
  return (
    <div className={`border rounded shadow ${className || ""}`}>{children}</div>
  );
});
Card.displayName = "Card";

const CardHeader = memo(({ children, className }) => {
  return <div className={`p-4 border-b ${className || ""}`}>{children}</div>;
});
CardHeader.displayName = "CardHeader";

const CardTitle = memo(({ children, className }) => {
  return <h3 className={`text-xl font-bold ${className || ""}`}>{children}</h3>;
});
CardTitle.displayName = "CardTitle";

const CardDescription = memo(({ children, className }) => {
  return <p className={`text-sm text-muted ${className || ""}`}>{children}</p>;
});
CardDescription.displayName = "CardDescription";

const CardContent = memo(({ children, className }) => {
  return <div className={`p-4 ${className || ""}`}>{children}</div>;
});
CardContent.displayName = "CardContent";

const CardFooter = memo(({ children, className }) => {
  return <div className={`p-4 border-t ${className || ""}`}>{children}</div>;
});
CardFooter.displayName = "CardFooter";

// Separator
const Separator = memo(({ className }) => {
  return <hr className={`my-2 ${className || ""}`} aria-hidden="true" />;
});
Separator.displayName = "Separator";

// Tabs
const TabsContext = createContext({
  activeTab: "",
  setActiveTab: () => {}
});

const Tabs = memo(({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const contextValue = { activeTab, setActiveTab };
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className} role="tablist">{children}</div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const TabsList = memo(({ children, className }) => {
  return <div className={`flex ${className || ""}`} role="tablist">{children}</div>;
});
TabsList.displayName = "TabsList";

const TabsTrigger = memo(({ children, value, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      className={`px-4 py-2 cursor-pointer ${
        isActive ? "font-bold border-b-2 border-blue-500" : ""
      } ${className || ""}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = memo(({ children, value, className }) => {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  
  return (
    <div 
      className={className} 
      role="tabpanel" 
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

// Feature list item - reused in multiple places
const FeatureItem = memo(({ icon, text, color = "green" }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 shrink-0">{icon}</div>
    <p>{text}</p>
  </div>
));
FeatureItem.displayName = "FeatureItem";

// Numbered list item - reused in multiple places
const NumberedItem = memo(({ number, text, colorClass = "border-slate-200 text-slate-600" }) => (
  <div className="flex items-start gap-3">
    <div className={`shrink-0 mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center text-xs font-medium ${colorClass}`}>
      {number}
    </div>
    <p>{text}</p>
  </div>
));
NumberedItem.displayName = "NumberedItem";

// Social Media Buttons - reused component
const SocialMediaButtons = memo(() => (
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
      aria-label="Visit our Instagram"
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
SocialMediaButtons.displayName = "SocialMediaButtons";

// Data constants
const INCLUSIONS = [
  {
    icon: <Shield className="h-5 w-5 text-green-600" />,
    text: "Accommodation on a triple-sharing basis with twin beds and an extra mattress.",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    text: "Meals as mentioned in the itinerary.",
  },
  {
    icon: <Motorcycle className="h-5 w-5 text-green-600" />,
    text: "RE Classic, Bullet, Himalayan, KTM, or Xpulse with fuel as per your chosen package.",
  },
  {
    icon: <Shield className="h-5 w-5 text-green-600" />,
    text: "Protective gear for both rider and pillion (jackets, knee guards, helmets provided; you may use your own for a better fit).",
  },
  {
    icon: <Compass className="h-5 w-5 text-green-600" />,
    text: "Experienced Road Captain to lead the ride.",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    text: "24/7 Breakdown Support with mechanic and staff assistance.",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    text: "Backup vehicle for your luggage.",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    text: "Inner Line Permits and Environmental Fees are included.",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    text: "Oxygen cylinders available in case of emergency.",
  },
  {
    icon: <Check className="h-5 w-5 text-green-600" />,
    text: "Basic medical kit for emergencies.",
  },
];

const EXCLUSIONS = [
  "Cost of spare parts used during the ride.",
  "Lunch, bonfire, tolls, travel insurance, and any additional costs such as pants, gloves, boots, and photography.",
  "Expenses for food, accommodation, and travel due to health issues or natural events (landslides, roadblocks, weather).",
  "Any extra charges if the itinerary is altered due to force majeure.",
  "Personal expenses like drinks, water, alcohol, snacks, phone calls, room service, laundry, and tips for drivers, guides, or hotel staff.",
  "GST @ 5% applicable.",
  "Refundable motorcycle security deposit of Rs 5000 per bike.",
  "Entry fees for monasteries, monuments, or charges related to photo/video cameras.",
  "Towing charges if a vehicle is left stranded during the ride.",
  "Room check-ins before 12 noon.",
  "Anything not mentioned in the inclusions.",
];

const IMPORTANT_INFO = [
  "We are not responsible for itinerary changes due to weather, landslides, flight cancellations, or unforeseen circumstances.",
  "A refundable bike security deposit is required before the trip starts.",
  "Only rucksacks, backpacks, or saddle bags weighing up to 20 kgs per person are allowed. Suitcases are not permitted.",
  "Unexpected hikes in transport or accommodation costs (e.g., fuel surcharges) will affect the final price.",
  "Photography and drone shoots are subject to time, weather, and government restrictions.",
  "The tour schedule may change based on traffic, restrictions, or unforeseen events.",
  "This itinerary and pricing apply only to Indian nationals.",
  "No refunds will be provided for unused services.",
  "Rescheduling your dates will incur an additional fee of Rs 5000 per person.",
  "All inclusions are valid for a group of 6+ participants.",
  "We reserve the right to remove any client for misbehavior, quarrels, or any form of assault affecting others.",
];

const BOOKING_POLICY = [
  "A non-refundable deposit of INR 7500 per person is required for slot confirmation.",
  "The remaining balance must be paid 45 days prior to departure.",
  "Failure to comply with the payment policy may result in cancellation without notice.",
];

const CANCELLATION_POLICY = [
  "If cancelled 30 days or more before departure, 25% of the total cost will be deducted.",
  "If cancelled 20-30 days before departure, 50% of the total cost will be deducted.",
  "If cancelled less than 20 days before departure, 100% of the cost will be deducted.",
  "The booking deposit is non-refundable.",
];

// ------------------------
// Main CustomToursDetails Component
// ------------------------

export default function CustomToursDetails() {
  // Handler functions
  const handleBookNow = () => {
    window.open(
      "https://wa.me/7017775164?text=I%20would%20like%20to%20book%20a%20tour",
      "_blank"
    );
  };

  const handleContactUs = () => {
    window.location.href = "/contact";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Custom Tours Options
            </h1>
            <p className="text-xl opacity-90">
              Experience the adventure of a lifetime with our customized
              motorcycle tours
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={handleBookNow}
              >
                Book Now <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                onClick={handleContactUs}
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" /> Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs defaultValue="add-ons" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="add-ons">Add-Ons</TabsTrigger>
            <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
            <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>

          {/* Add-Ons Tab */}
          <TabsContent value="add-ons" className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-2xl">
                  <Camera className="mr-2 h-6 w-6" aria-hidden="true" /> Photography &amp; Travel
                  Reel Add-On
                </CardTitle>
                <CardDescription className="text-white/90 text-lg">
                  Capture your adventure with professional photography
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <p className="mb-4 text-lg">
                      Enhance your journey with our Photography &amp; Travel
                      Reel Add-On for just
                      <Badge
                        variant="outline"
                        className="ml-2 text-lg font-bold bg-orange-50 border-orange-200 text-orange-700">
                        ₹7,500
                      </Badge>
                    </p>
                    <p className="font-medium text-lg mb-2">
                      Here's what you get:
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold">
                            High-Quality Photos:
                          </span>{" "}
                          30+ shots capturing candid moments and breathtaking
                          landscapes.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold">
                            Dynamic Travel Reels:
                          </span>{" "}
                          Professional reels (15-25 seconds) highlighting the
                          most exciting parts of your trip—perfect for Instagram
                          or sharing with friends.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold">Drone Shots:</span>{" "}
                          Stunning aerial views of Ladakh and Spiti (where
                          permitted).
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold">
                            Social Media-Ready Content:
                          </span>{" "}
                          We handle the edits so you can simply post and impress
                          your followers!
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/3 bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-orange-800">
                      Why It's Worth It
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-orange-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold">
                            A Lifetime of Memories:
                          </span>{" "}
                          Relive your adventure through photos and reels.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-orange-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold">Stress-Free:</span> No
                          need to worry about capturing the perfect shot—we've
                          got you covered.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-orange-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-semibold">
                            Unbeatable Value:
                          </span>{" "}
                          Professional services for less than what you'd spend
                          on a single photoshoot!
                        </div>
                      </li>
                    </ul>
                    <p className="mt-4 font-medium text-orange-800">
                      For just ₹7,500, leave the camera to us and focus on the
                      ride, the view, and the moments that truly matter.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Motorcycle className="mr-2 h-5 w-5" aria-hidden="true" /> Additional Add-Ons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Photography Package
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-orange-700">
                        ₹7,500
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Professional photos &amp; reels
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Bike Upgrade</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium">Himalayan 411</p>
                        <p className="text-xl font-bold text-orange-700">
                          ₹4,500
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">
                          Himalayan 452 / KTM 390ADV
                        </p>
                        <p className="text-xl font-bold text-orange-700">
                          ₹7,500
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Twin Sharing Room
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-orange-700">
                        ₹4,000
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Upgrade from triple sharing
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 rounded-b-lg p-4">
                <div>
                  <p className="font-medium">
                    Visit us:{" "}
                    <a
                      href="http://www.revnroar.com"
                      className="text-orange-700 hover:text-orange-800"
                      target="_blank"
                      rel="noopener noreferrer">
                      www.revnroar.com
                    </a>
                  </p>
                  <p className="font-medium">
                    Reach us:{" "}
                    <a
                      href="tel:+917017775164"
                      className="text-orange-700 hover:text-orange-800">
                      +91-7017775164
                    </a>
                  </p>
                </div>
                <Button 
                  className="sm:ml-auto bg-orange-600 hover:bg-orange-700"
                  onClick={handleBookNow}
                >
                  Book Add-Ons
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Inclusions Tab */}
          <TabsContent value="inclusions">
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-600" aria-hidden="true" /> What's
                  Included
                </CardTitle>
                <CardDescription>
                  Everything covered in your tour package
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                  {INCLUSIONS.map((item, index) => (
                    <FeatureItem 
                      key={index} 
                      icon={item.icon} 
                      text={item.text} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exclusions Tab */}
          <TabsContent value="exclusions">
            <Card>
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-red-600" aria-hidden="true" /> What's Not
                  Included
                </CardTitle>
                <CardDescription>
                  Items not covered in your tour package
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {EXCLUSIONS.map((item, index) => (
                    <NumberedItem 
                      key={index} 
                      number={index + 1} 
                      text={item} 
                      colorClass="border-red-200 text-red-600" 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies">
            <div className="space-y-6">
              <Alert className="bg-amber-50 border-amber-200">
                <AlertDescription className="text-amber-800">
                  Please review our policies carefully before booking. These
                  policies are designed to ensure a smooth and enjoyable
                  experience for all participants.
                </AlertDescription>
              </Alert>

              <Accordion className="w-full">
                <AccordionItem>
                  <AccordionTrigger className="text-lg font-semibold">
                    Important Information
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2">
                    {IMPORTANT_INFO.map((item, index) => (
                      <NumberedItem key={index} number={index + 1} text={item} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                  <AccordionTrigger className="text-lg font-semibold">
                    Booking Policy
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2">
                    {BOOKING_POLICY.map((item, index) => (
                      <NumberedItem key={index} number={index + 1} text={item} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                  <AccordionTrigger className="text-lg font-semibold">
                    Cancellation Policy
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-2">
                    {CANCELLATION_POLICY.map((item, index) => (
                      <NumberedItem key={index} number={index + 1} text={item} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">Ready for your adventure?</h2>
            <p className="mt-2 text-slate-300">
              Book your custom tour today and experience the journey of a
              lifetime
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleBookNow}
            >
              Book Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              onClick={handleContactUs}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Social Media Buttons */}
      <SocialMediaButtons />
    </div>
  );
}