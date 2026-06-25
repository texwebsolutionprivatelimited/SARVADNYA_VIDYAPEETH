import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4 mt-2 z-10 relative">
      {/* Button 1: Visit University */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="flex-grow sm:flex-grow-0"
      >
        <Link
          to="/about"
          className="block w-full sm:w-auto text-center px-7 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple-700/20"
        >
          Visit University
        </Link>
      </motion.div>

      {/* Button 2: AICTE Scholarship */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="flex-grow sm:flex-grow-0"
      >
        <Link
          to="/admission"
          className="block w-full sm:w-auto text-center px-7 py-3 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200/60 font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Student Credit Card
        </Link>
      </motion.div>
    </div>
  );
}
