"use client";

import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5">
       <Navbar/ >
      </div>
    </header>
  );
}
