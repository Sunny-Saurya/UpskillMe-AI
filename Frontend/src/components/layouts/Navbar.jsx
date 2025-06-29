import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuSparkles, LuMenu, LuX } from "react-icons/lu";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import toast from "react-hot-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Interview Prep", path: "/sessions" },
    { name: "Progress", path: "/progress" },
  ];

  const handleNavClick = (path) => {
    if (["/progress", "/sessions"].includes(path)) {
      toast("This feature is coming soon 🚧");
    } else {
      window.location.href = path;
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200/70 py-2.5 px-4 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          {/* Logo/Brand */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <LuSparkles className="text-white text-lg" />
              </div>
              <motion.h2 
                className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800"
                whileHover={{ scale: 1.03 }}
              >
                UpskillMe AI
              </motion.h2>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.div key={link.path} whileHover={{ scale: 1.05 }}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProfileInfoCard />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <LuX className="text-xl" />
            ) : (
              <LuMenu className="text-xl" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-4">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      handleNavClick(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 text-left text-gray-600 hover:text-amber-600 transition-colors w-full"
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <ProfileInfoCard mobileView />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
