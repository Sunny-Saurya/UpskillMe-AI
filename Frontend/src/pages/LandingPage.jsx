import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuSparkles, LuArrowRight } from "react-icons/lu";

import HERO_IMG from "../assets/Hero_Image.png";
import { UserContext } from '../context/userContext';
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { APP_FEATURES } from "../utils/data";
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { AnimatedTestimonialsDemo } from '../components/Testimonial';
import CompactFooter from '../components/Footer';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isHovered, setIsHovered] = useState(false);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFFCEF] to-amber-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              transition: {
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute w-64 h-64 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full opacity-20 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3">
              <LuSparkles className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
              UpskillMe AI
            </span>
          </motion.div>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setOpenAuthModal(true)}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 bg-black text-sm font-semibold text-white px-6 py-2.5 rounded-full group-hover:bg-transparent transition-all duration-300 flex items-center">
                Login / Sign Up
                <LuArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          )}
        </header>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-xs font-semibold bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full border border-amber-200 shadow-sm"
              >
                <LuSparkles className="text-base" />
                AI Powered Interview
              </motion.div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="block">Ace Your Next</span>
               <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "radial-gradient(circle, #FF9324 0%, #FCD760 100%)",
                    backgroundSize: "200% 200%",
                    animation: "text-shine 3s linear infinite"
                  }}
                >
                  Technical Interview
                </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Get role-specific interview questions, AI-powered feedback, and personalized coaching to 
              transform your interview skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCTA}
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 bg-black text-white font-semibold px-8 py-3.5 rounded-full group-hover:bg-transparent transition-all duration-300 flex items-center">
                  Get Started Free
                  <LuArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-gray-800 font-semibold px-8 py-3.5 rounded-full border border-gray-200 hover:border-amber-300 transition-all duration-300 flex items-center shadow-sm"
              >
                See How It Works
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-white"></div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-amber-700">5000+</span> professionals boosted their careers
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-300 to-amber-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 to-amber-500 rounded-3xl opacity-10 blur-lg"></div>
              <img 
                src={HERO_IMG} 
                alt="Interview Prep Illustration" 
                className="relative w-full rounded-2xl shadow-2xl border-8 border-white z-10" 
              />
            </div>
            
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-20"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-white mb-2">
                <LuSparkles className="text-xl" />
              </div>
              <div className="text-sm font-semibold text-gray-800">AI Feedback</div>
              <div className="text-xs text-gray-500">Real-time analysis</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Interview Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to go from nervous to confident
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APP_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-50 relative overflow-hidden group"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500 rounded-xl flex items-center justify-center mb-4 text-white">
                    <LuSparkles className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-amber-600 font-medium">
                    Learn more <LuArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedTestimonialsDemo />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-amber-600 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who landed their dream jobs with our AI coach
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTA}
              className="bg-black text-white font-semibold px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg flex items-center mx-auto"
            >
              Start Free Trial <LuArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}

      <CompactFooter />

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </div>
  );
};

export default LandingPage;