'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Dumbbell } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/classes', label: 'Classes' },
    { id: '/membership', label: 'Membership' },
    { id: '/trainers', label: 'Trainers' },
    { id: '/about', label: 'About' },
    { id: '/contact', label: 'Contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Dumbbell className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold">APEX FITNESS</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.id}
                className={`font-medium transition-colors ${
                  pathname === item.id
                    ? 'text-orange-500'
                    : 'text-white hover:text-orange-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/membership"
            className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Join Now
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.id}
                onClick={handleNavClick}
                className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
                  pathname === item.id
                    ? 'bg-gray-900 text-orange-500'
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/membership"
              onClick={handleNavClick}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-2"
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
