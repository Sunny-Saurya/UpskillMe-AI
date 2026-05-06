import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LuSparkles } from 'react-icons/lu';

const CompactFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <LuSparkles className="text-white text-lg" />
            <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-gray-100">UpskillMe AI</span>
          </div>

          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-4 w-4" />
            </a>
          </motion.div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} UpskillMe AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CompactFooter;