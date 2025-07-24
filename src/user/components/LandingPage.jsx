import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import { motion } from "framer-motion";
import Credentials from "./Credentials";
import Services from "./Services";
import Projects from "./Projects";
import Contact from "./Contact";

const LandingPage = () => {
  const [clients] = useState([
    "IREO",
    "IDEA",
    "Anantaraj Cloud",
    "Skyon Group",
    "Government Projects",
    "Industrial Clients",
    "Institutional Partners",
  ]);

  const defaultLogos = [
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png",
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/200px-Tesla_T_symbol.svg.png",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png",
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png",
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/200px-Spotify_logo_without_text.svg.png",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Rating & Review Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Client Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Sophic Designs delivered exceptional MEP solutions for our
                  high-rise project. Their innovative approach saved us
                  significant costs while maintaining safety standards."
                </p>
                <p className="font-semibold">Project Director</p>
                <p className="text-gray-500">Leading Real Estate Developer</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Client Logos */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted By Industry Leaders
          </h2>

          <div className="relative h-32 overflow-hidden">
            <motion.div
              className="absolute flex space-x-16"
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {defaultLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center"
                >
                  {/* Logo Placeholder - Replace with actual logos */}
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-16 flex items-center justify-center">
                    <img src={logo.logo} alt={logo.name} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Add this block for mobile view */}
          <div className="relative h-32 overflow-hidden md:hidden">
            <motion.div
              className="absolute flex space-x-16"
              animate={{
                x: ["0%", "-200%"],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(7)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-16 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Client Logo</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Services />
      <Projects />

      {/* Key Innovations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Innovations
          </h2>

          <div className="space-y-12">
            {innovationsData.map((innovation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold ml-4">
                      {innovation.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Project:</span>{" "}
                    {innovation.project}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {innovation.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Credentials />
      <Contact />
      {/* Embedded Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Offices
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Delhi Office</h3>
              <p className="mb-4">
                179-A, 1st Floor, Jeewan Nagar, New Delhi - 110014
              </p>
              <div className="overflow-hidden rounded-xl shadow-lg h-80">
                <iframe
                  title="Delhi Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.362300144828!2d77.21515861508215!3d28.62097698242201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a6b85d4a0f%3A0x3e3a1d8e0e8b0b1d!2s179-A%2C%20Jeewan%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110014!5e0!3m2!1sen!2sin!4v1622020000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Faridabad Office</h3>
              <p className="mb-4">
                H. No. 351, Sector-48, Faridabad, Haryana - 121001
              </p>
              <div className="overflow-hidden rounded-xl shadow-lg h-80">
                <iframe
                  title="Faridabad Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.12980439491!2d77.35831891533147!3d28.63290498237219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee2a6b85d4a0f%3A0x3e3a1d8e0e8b0b1d!2sH%20No%20351%2C%20Sector%2048%2C%20Faridabad%2C%20Haryana%20121001!5e0!3m2!1sen!2sin!4v1622020000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


// Innovations data
const innovationsData = [
  {
    title: "High-Rise Development Innovation",
    project: "IREO High-Rise Developments",
    achievements: [
      "Designed 150m+ towers without service floors - first in North India",
      "Deviation from standard practice of service floors for 100m+ buildings",
      "Pioneered new structural approach for high-rises",
    ],
  },
  {
    title: "Data Center Fire Safety Innovation",
    project: "IDEA Data Centre, Pune (2016)",
    achievements: [
      "Replaced 150MT gas system with water mist system in non-data hall areas",
      "Reduced gas requirement by 66% (150MT to 50MT)",
      "Implemented pre-action design with dual-trigger activation",
      "Created cost-effective, refill-free solution now becoming industry standard",
    ],
  },
  {
    title: "Hyperscale Data Center Efficiency",
    project: "Anantaraj Cloud Datacentre, Manesar (2021)",
    achievements: [
      "21.5 MW IT load facility with two 3MW data halls",
      "Implemented active RDHx in each rack - global first at this scale",
      "Eliminated false floors using fan wall units",
      "Achieved PUE of 1.42 (against 1.5 target) with air-cooled chillers",
    ],
  },
];

// Certifications data
const certificationsData = [
  { icon: "📜", name: "NFPA" },
  { icon: "🏛️", name: "NBC" },
  { icon: "🌿", name: "LEED" },
  { icon: "♻️", name: "GRIHA" },
  { icon: "🔌", name: "UL" },
  { icon: "🏭", name: "FM" },
  { icon: "❄️", name: "ASHRAE" },
  { icon: "🇮🇳", name: "ISHRAE" },
];

export default LandingPage;
