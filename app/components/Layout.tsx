import React from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-black text-gray-100 font-mono flex flex-col ${className}`}>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}