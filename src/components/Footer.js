'use client';

import Link from 'next/link';
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Please enter an email address.');
      setIsSubmitting(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'subscribers'), {
        email: email,
        timestamp: serverTimestamp(),
      });
      setSuccess('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (err) {
      setError('Error subscribing. Please try again later.');
      console.error('Subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2">About Us</h3>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-purple-400">Our Vision & Values</Link></li>
            <li><Link href="/about" className="hover:text-purple-400">Our History</Link></li>
            <li><Link href="/about" className="hover:text-purple-400">Our Leadership</Link></li>
            <li><Link href="/about" className="hover:text-purple-400">Our Structure</Link></li>
            <li><Link href="/about" className="hover:text-purple-400">Our Partners</Link></li>
            <li><Link href="/about" className="hover:text-purple-400">Accountability</Link></li>
            <li><Link href="/about" className="hover:text-purple-400">FAQ</Link></li>
          </ul>
        </div>

        {/* Our Approaches to Change */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2">Our Approaches to Change</h3>
          <ul className="space-y-1">
            <li><Link href="/projects" className="hover:text-purple-400">Community Programs</Link></li>
            <li><Link href="/projects" className="hover:text-purple-400">Talent Development</Link></li>
            <li><Link href="/projects" className="hover:text-purple-400">Our Global Strategy</Link></li>
            <li><Link href="/projects" className="hover:text-purple-400">The Role of Community</Link></li>
          </ul>
        </div>

        {/* Work with Us */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2">Work with Us</h3>
          <ul className="space-y-1">
            <li><Link href="/careers" className="hover:text-purple-400">Our Culture</Link></li>
            <li><Link href="/careers" className="hover:text-purple-400">Careers & Internships</Link></li>
            <li><Link href="/careers" className="hover:text-purple-400">Explore Open Positions</Link></li>
            <li><Link href="/careers" className="hover:text-purple-400">Internships</Link></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2">Connect With Us</h3>
          <ul className="space-y-1">
            <li><Link href="/contact" className="hover:text-purple-400">Contact Us</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400">Tule in Your County</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400">Report a Concern</Link></li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/tule.initiative/" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">Facebook</span></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">YouTube</span></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">Twitter</span></a>
            <a href="https://www.instagram.com/tuleinitiative/" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">Instagram</span></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">LinkedIn</span></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-l text-black"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 text-white p-2 rounded-r hover:bg-purple-700 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {error && <p className="text-red-400 mt-2">{error}</p>}
          {success && <p className="text-green-400 mt-2">{success}</p>}
        </div>
        <p className="text-sm mt-2 md:mt-0">© 2025 Tule Initiative | <a href="/privacy" className="hover:text-purple-400">Privacy Policy</a> | <a href="/terms" className="hover:text-purple-400">Terms of Use</a></p>
      </div>
    </footer>
  );
}