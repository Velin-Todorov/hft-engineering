"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Articles", href: "#" },
    { name: "Networking", href: "#" },
    { name: "Data Structures", href: "#" },
    { name: "Performance", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5">
      <nav className="flex justify-between items-center py-4">
        <Link
          href="#"
          className="text-xl font-bold text-cyan-400 flex items-center gap-2 font-mono"
        >
          <span className="text-lg">⚡</span>
          HFT Engineering
        </Link>

        <ul className="hidden md:flex gap-8 font-mono text-sm">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-gray-400 hover:text-cyan-400"
        >
          <Menu size={24} />
        </button>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-cyan-400 font-bold font-mono">
            HFT Engineering
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-cyan-400"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col p-4 gap-4 font-mono text-sm">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="block text-gray-400 hover:text-cyan-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
