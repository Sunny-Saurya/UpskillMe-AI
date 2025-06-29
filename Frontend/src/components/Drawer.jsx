import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] w-full md:w-[40vw] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-300 dark:border-gray-700 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h5>
        <button
          onClick={onClose}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
        >
          <LuX className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 overflow-y-auto max-h-[calc(100dvh-64px-64px)]">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
