"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/next.svg"
              alt="Logo"
              width={40}
              height={40}
              className="dark:invert"
            />
            <span className="text-xl font-bold text-gray-800">TuningMosquera</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              Inicio
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              Modelos
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              Tuning
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              Galería
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
              Contacto
            </a>
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Cotizar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-red-600 py-2 transition-colors">
                Inicio
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 py-2 transition-colors">
                Modelos
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 py-2 transition-colors">
                Tuning
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 py-2 transition-colors">
                Galería
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 py-2 transition-colors">
                Contacto
              </a>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-2">
                Cotizar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}