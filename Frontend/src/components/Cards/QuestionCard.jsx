import React, { useEffect, useRef, useState } from 'react';
import {
  LuChevronDown,
  LuPin,
  LuPinOff,
  LuSparkle,
} from 'react-icons/lu';
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({
  question,
  answer,
  isPinned,
  onLearnMore,
  onTogglePin,
  isSidebarOpen = false, // new prop
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group 
        ${isSidebarOpen ? 'md:w-[95%]' : 'w-full'}`}
      style={{
        transform: isSidebarOpen ? 'translateX(-8px)' : 'translateX(0)',
      }}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1 flex gap-3">
          <span className="text-xs font-bold text-gray-400 pt-1">Q</span>
          <h3
            className="text-sm md:text-base font-medium text-gray-800 leading-snug cursor-pointer"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          {/* Actions */}
          <div
            className={`flex gap-2 mb-1 transition-all duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <button
              onClick={onTogglePin}
              className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition border border-transparent hover:border-indigo-300"
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
              <span className="hidden sm:inline">
                {isPinned ? 'Unpin' : 'Pin'}
              </span>
            </button>

            <button
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
              className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium text-cyan-700 bg-cyan-100 hover:bg-cyan-200 transition border border-transparent hover:border-cyan-300"
            >
              <LuSparkle size={14} />
              <span className="hidden sm:inline">Learn More</span>
            </button>
          </div>

          {/* Toggle Expand */}
          <button
            onClick={toggleExpand}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition"
          >
            <LuChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
            {isExpanded ? 'Hide' : 'Answer'}
          </button>
        </div>
      </div>

      {/* Answer */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-3 bg-gray-50 rounded-lg p-4 text-sm text-gray-700"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
