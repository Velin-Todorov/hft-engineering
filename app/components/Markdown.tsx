"use client";

import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "highlight.js/styles/github-dark.css";

import Markdown from "react-markdown";
import CopyButton from "./CopyButton";

interface MarkdownRendererProps {
  markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings
        h1: ({ node, ...props }) => (
          <h1
            className="text-4xl font-bold text-gray-100 mb-6 mt-8 first:mt-0"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="text-3xl font-bold text-gray-100 mb-4 mt-8 first:mt-0"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="text-2xl font-bold text-gray-100 mb-3 mt-6"
            {...props}
          />
        ),

        // Paragraphs
        p: ({ node, ...props }) => (
          <p className="text-gray-300 leading-relaxed mb-4" {...props} />
        ),

        // Links
        a: ({ node, ...props }) => (
          <a
            className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),

        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-cyan-400 bg-cyan-900/10 pl-4 py-3 my-6 italic text-gray-300"
            {...props}
          />
        ),

        // Lists
        ul: ({ node, ...props }) => (
          <ul
            className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4"
            {...props}
          />
        ),
        ol: ({ node, ...props }) => (
          <ol
            className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4"
            {...props}
          />
        ),

        pre({ node, children, ...props }: { node?: unknown; children?: React.ReactNode; [key: string]: unknown }) {
          return <>{children}</>;
        },
        code({ node, className, children, ...rest }: { node?: unknown; className?: string; children?: React.ReactNode; [key: string]: unknown }) {
          const match = /language-(\w+)/.exec(className || "");

          if (match) {
            // This is a code block
            return (
              <div className="my-6 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                  <span className="text-xs text-gray-400 uppercase font-mono">
                    {match[1]}
                  </span>
                  <CopyButton text={String(children).replace(/\n$/, "")} />
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: "transparent",
                  }}
                  {...rest}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            );
          }

          // This is inline code
          return (
            <code
              className="bg-gray-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm font-mono"
              {...rest}
            >
              {children}
            </code>
          );
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <table className="w-full text-sm" {...props} />
            </div>
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="border-b-2 border-gray-700" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th
            className="text-left py-3 px-4 text-gray-400 font-semibold"
            {...props}
          />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="text-gray-300" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="border-b border-gray-800 last:border-0" {...props} />
        ),
        td: ({ node, ...props }) => <td className="py-3 px-4" {...props} />,
      }}
    >{markdown}</Markdown>
  );
}
