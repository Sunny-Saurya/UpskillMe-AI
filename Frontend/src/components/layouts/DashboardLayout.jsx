import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
// import { LuLoader2 } from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";


const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar with subtle shadow */}
      <Navbar />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        {user === undefined ? (
          // Loading State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="text-amber-500 mb-4"
            >
              {/* <LuLoader2 className="text-4xl" /> */}
            </motion.div>
            <p className="text-lg text-gray-600 font-medium">
              Loading your dashboard...
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Getting everything ready for you
            </p>
          </motion.div>
        ) : user ? (
          // Authenticated Content
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        ) : (
          // Unauthenticated State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="text-2xl text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Please login to access the dashboard features and your interview
              sessions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-6 py-2.5 rounded-lg shadow hover:shadow-md transition-all"
            >
              Go to Login Page
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UpskillMe AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
