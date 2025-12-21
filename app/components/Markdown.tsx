"use client";

import { memo } from "react";
import remarkGfm from "remark-gfm";
import Markdown, { Components } from "react-markdown";
import CodeBlock from "./CodeBlock";

interface MarkdownRendererProps {
  markdown: string;
}

const REMARK_PLUGINS = [remarkGfm];

const markdownComponents: Components = {
  h1: (props) => (
    <h1
      className="text-4xl font-bold text-gray-100 mb-6 mt-8 first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-3xl font-bold text-gray-100 mb-4 mt-8 first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="text-2xl font-bold text-gray-100 mb-3 mt-6" {...props} />
  ),
  p: (props) => (
    <p className="text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  a: (props) => (
    <a
      className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-cyan-400 bg-cyan-900/10 pl-4 py-3 my-6 italic text-gray-300"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4"
      {...props}
    />
  ),
  pre: ({ children }) => <>{children}</>,
  code({ className, children, ...rest }) {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    if (match) {
      return <CodeBlock language={match[1]} code={codeString} />;
    }

    return (
      <code
        className="bg-gray-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm font-mono"
        {...rest}
      >
        {children}
      </code>
    );
  },
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <table className="w-full text-sm" {...props} />
      </div>
    </div>
  ),
  thead: (props) => <thead className="border-b-2 border-gray-700" {...props} />,
  th: (props) => (
    <th
      className="text-left py-3 px-4 text-gray-400 font-semibold"
      {...props}
    />
  ),
  tbody: (props) => <tbody className="text-gray-300" {...props} />,
  tr: (props) => (
    <tr className="border-b border-gray-800 last:border-0" {...props} />
  ),
  td: (props) => <td className="py-3 px-4" {...props} />,
};

function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <Markdown remarkPlugins={REMARK_PLUGINS} components={markdownComponents}>
      {markdown}
    </Markdown>
  );
}

export default memo(MarkdownRenderer);