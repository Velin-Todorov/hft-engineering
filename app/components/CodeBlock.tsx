// CodeBlock.tsx
import dynamic from "next/dynamic";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton"; // Ensure this path is correct

// 🚀 Performance Optimization: Lazy load the heavy syntax highlighter
const DynamicSyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  {
    ssr: false, // Syntax highlighting usually requires the browser environment
    loading: () => (
      <div className="p-4 bg-gray-900 text-gray-400">Loading code block...</div>
    ),
  }
);

interface CodeBlockProps {
  className?: string;
  children?: React.ReactNode;
  node?: unknown; // Standard react-markdown component prop
}

export function CodeBlock({ className, children, ...rest }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || "");
  const codeText = String(children).replace(/\n$/, "");

  if (match) {
    // 💡 Code Block Rendering (Fenced Blocks)
    return (
      <div className="my-6 rounded-lg overflow-hidden border border-gray-700">
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <span className="text-xs text-gray-400 uppercase font-mono">
            {match[1]}
          </span>
          <CopyButton text={codeText} />
        </div>
        <DynamicSyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          showLineNumbers
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: "transparent",
            // You can add padding here if the syntax highlighting style doesn't include it
          }}
          {...rest}
        >
          {codeText}
        </DynamicSyntaxHighlighter>
      </div>
    );
  }

  // 📝 Inline Code Rendering
  return (
    <code
      className="bg-gray-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm font-mono"
      {...rest}
    >
      {children}
    </code>
  );
}