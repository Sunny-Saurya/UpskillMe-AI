import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuCopy, LuCheck, LuCode, LuSparkles } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
          <LuSparkles className="text-amber-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">AI Response</h3>
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            return !inline ? (
              <CodeBlock
                code={String(children).replace(/\n$/, '')}
                language={language}
              />
            ) : (
              <code className="px-1.5 py-0.5 bg-amber-50 rounded-md text-sm font-mono text-amber-700" {...props}>
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>;
          },
          strong({ children }) {
            return <strong className="text-gray-800 font-semibold">{children}</strong>;
          },
          em({ children }) {
            return <em className="text-gray-600 italic">{children}</em>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="text-gray-700">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-amber-300 pl-4 italic text-gray-600 bg-amber-50/50 py-2 rounded-r mb-4">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold text-gray-800 mb-3 mt-6">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">{children}</h3>;
          },
          h4({ children }) {
            return <h4 className="text-base font-normal text-gray-800 mb-2 mt-3">{children}</h4>;
          },
          a({ children, href }) {
            return (
              <a
                href={href}
                className="text-amber-600 hover:text-amber-700 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto mb-4 rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-50">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
          },
          th({ children }) {
            return (
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {children}
              </th>
            );
          },
          tr({ children }) {
            return <tr className="hover:bg-amber-50/30">{children}</tr>;
          },
          td({ children }) {
            return (
              <td className="px-4 py-3 text-sm text-gray-700">
                {children}
              </td>
            );
          },
          hr() {
            return <hr className="my-6 border-gray-200" />;
          },
          img({ src, alt }) {
            return (
              <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
                <img src={src} alt={alt} className="max-w-full h-auto" />
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative my-6 rounded-lg border border-gray-200 bg-[#fafafa] overflow-hidden shadow-sm"
    >
      <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-gray-200">
        <div className="flex items-center gap-2 text-xs text-amber-700 font-medium">
          <LuCode size={14} />
          <span>{language || 'code'}</span>
        </div>
        <motion.button
          onClick={copyCode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 px-2.5 py-1.5 rounded-md hover:bg-amber-200/30 transition-colors"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1"
              >
                <LuCheck size={14} />
                <span>Copied</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1"
              >
                <LuCopy size={14} />
                <span>Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          fontSize: '13px',
          backgroundColor: 'transparent',
          lineHeight: '1.5',
        }}
        codeTagProps={{
          style: {
            fontFamily: '"JetBrains Mono", monospace',
          },
        }}
        showLineNumbers={true}
        lineNumberStyle={{
          color: '#9ca3af',
          paddingRight: '1.5em',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  );
}

export default AIResponsePreview;