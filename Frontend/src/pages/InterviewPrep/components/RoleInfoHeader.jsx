import React from 'react';

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[40vw] md:w-[30vw] h-[200px] z-0">
        <div className="relative w-full h-full">
          <div className="absolute w-32 h-32 bg-lime-400 rounded-full blur-3xl animate-blob1" />
          <div className="absolute w-32 h-32 bg-teal-400 rounded-full blur-3xl animate-blob2 left-12 top-6" />
          <div className="absolute w-28 h-28 bg-cyan-300 rounded-full blur-2xl animate-blob3 left-6 top-16" />
          <div className="absolute w-24 h-24 bg-fuchsia-300 rounded-full blur-2xl animate-blob1 left-16 top-10" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{role}</h2>
            <p className="text-sm text-gray-600 mt-1">{topicsToFocus}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-xs font-medium text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </span>
            <span className="text-xs font-medium text-white bg-black px-3 py-1 rounded-full">
              Questions: {questions}
            </span>
            <span className="text-xs font-medium text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated || "N/A"}
            </span>
          </div>

          {description && (
            <p className="mt-4 text-sm text-gray-700 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
