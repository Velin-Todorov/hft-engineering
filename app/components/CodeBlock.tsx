"use client";

import { memo } from "react";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  language: string;
  code: string;
}

function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <span className="text-xs text-gray-400 uppercase font-mono">
          {language}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 overflow-x-auto bg-[#0d1117] text-[#c9d1d9] text-sm font-mono m-0 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default memo(CodeBlock);