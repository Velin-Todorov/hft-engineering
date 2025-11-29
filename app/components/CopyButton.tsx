"use client";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
    >
      Copy
    </button>
  );
}

