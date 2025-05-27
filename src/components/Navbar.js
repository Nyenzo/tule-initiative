// File: src/app/components/Navbar.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import DonateButton from './DonateButton';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

// Navbar Component: Renders the navigation bar with links and user-specific options
export default function Navbar() {
  // State Management: Initialize state for menu visibility, donation popup, scroll position, and a reference for the menu
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const donateRef = useRef(null); // Reference for the donation form to exclude it from outside clicks

  // Scroll Effect: Adjust navbar position based on scroll position by toggling between top-0 and top-4
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Click Outside Handler: Close the mobile menu and donation popup when clicking outside their respective areas
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && donateRef.current && !donateRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsDonateOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Loading State: Display nothing while authentication status is being determined to avoid UI flicker
  if (loading) return null;

  // Navigation Bar Structure: Render the navbar with logo, links, and conditional user/admin options
  return (
    <nav 
      className={`fixed ${isScrolled ? 'top-0' : 'top-4'} left-0 right-0 mx-4 z-50 bg-blue-800 bg-opacity-90 text-yellow-300 flex justify-between items-center rounded-lg shadow-lg transition-all duration-200 px-0 py-2 sm:py-3 md:py-4`} // Removed left/right padding (px-0) to align logo
      style={{ height: '55px' }}
    >
      {/* Logo Section: Display the Tule Initiative logo aligned to the navbar start with curved left edges */}
      <div className="rounded-l-lg overflow-hidden m-0"> {/* Removed any margin (m-0) to ensure logo starts at the edge */}
        <Link href="/">
          <Image src="/tule-logo.png" alt="Tule Initiative Logo" width={150} height={50} className="hover:opacity-90 transition-opacity duration-200" />
        </Link>
      </div>

      {/* Navigation Links: Display links for desktop view with conditional admin options and a donate button */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex md:items-center">
          <Link href="/about" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Who We Are</Link>
          {user?.isAdmin && <Link href="/edit-content/about" className="px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">[Edit]</Link>}
          <Link href="/projects" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">What We Do</Link>
          {user?.isAdmin && <Link href="/edit-content/projects" className="px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">[Edit]</Link>}
          <Link href="/media" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">Media</Link>
          {user?.isAdmin && <Link href="/edit-content/media" className="px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">[Edit]</Link>}
          {user ? (
            <>
              {user.isAdmin && (
                <Link href="/admin" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">
                  Dashboard
                </Link>
              )}
              <Link href="/profile" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">Profile</Link>
              {user.isAdmin && <Link href="/admin/users" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">Users</Link>}
              <button
                onClick={async () => {
                  await logout();
                  console.log('Logout button clicked');
                }}
                className="px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">Login</Link>
              <Link href="/register" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">Sign Up</Link>
            </>
          )}
          {user?.isAdmin && <Link href="/donations" className="px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200 border-l border-blue-900">Donations</Link>}
          <div className="border-l border-blue-900 px-3 py-2" ref={donateRef}>
            <DonateButton isOpen={isDonateOpen} setIsOpen={setIsDonateOpen} />
          </div>
        </div>

        {/* Mobile Menu: Implement a hamburger menu for mobile devices with dropdown links */}
        <div className="md:hidden" ref={menuRef}>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-blue-800 bg-opacity-90 p-4 rounded-lg shadow-lg mt-2">
              <Link href="/about" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Who We Are</Link>
              {user?.isAdmin && <Link href="/edit-content/about" className="block px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">[Edit]</Link>}
              <Link href="/projects" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">What We Do</Link>
              {user?.isAdmin && <Link href="/edit-content/projects" className="block px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">[Edit]</Link>}
              <Link href="/media" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Media</Link>
              {user?.isAdmin && <Link href="/edit-content/media" className="block px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">[Edit]</Link>}
              {user ? (
                <>
                  {user.isAdmin && (
                    <Link href="/admin" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">
                      Dashboard
                    </Link>
                  )}
                  <Link href="/profile" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Profile</Link>
                  {user.isAdmin && <Link href="/admin/users" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Users</Link>}
                  <button
                    onClick={async () => {
                      await logout();
                      console.log('Logout button clicked');
                    }}
                    className="block px-3 py-2 text-sm sm:text-base text-purple-600 hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Login</Link>
                  <Link href="/register" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Sign Up</Link>
                </>
              )}
              {user?.isAdmin && <Link href="/donations" className="block px-3 py-2 text-sm sm:text-base hover:bg-blue-900 hover:rounded-lg hover:shadow-md transition-colors duration-200">Donations</Link>}
              <div className="px-3 py-2">
                <DonateButton isOpen={isDonateOpen} setIsOpen={setIsDonateOpen} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}