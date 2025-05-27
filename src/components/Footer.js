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
    <footer className="bg-gray-800 text-white p-4 sm:p-6" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2" id="footer-about-heading">About Us</h3>
          <ul className="space-y-1" role="list">
            <li><Link href="/about#our-vision-values" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Our Vision & Values section">Our Vision & Values</Link></li>
            <li><Link href="/about#our-history" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Our History section">Our History</Link></li>
            <li><Link href="/about#our-leadership" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Our Leadership section">Our Leadership</Link></li>
            <li><Link href="/about#our-structure" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Our Structure section">Our Structure</Link></li>
            <li><Link href="/about#our-partners" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Our Partners section">Our Partners</Link></li>
            <li><Link href="/about#accountability" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Accountability section">Accountability</Link></li>
            <li><Link href="/about#faq" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to FAQ section">FAQ</Link></li>
          </ul>
        </div>

        {/* Our Approaches to Change */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2" id="footer-approaches-heading">Our Approaches to Change</h3>
          <ul className="space-y-1" role="list">
            <li><Link href="/projects#community-programs" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Community Programs section">Community Programs</Link></li>
            <li><Link href="/projects#talent-development" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Talent Development section">Talent Development</Link></li>
            <li><Link href="/projects#our-global-strategy" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Our Global Strategy section">Our Global Strategy</Link></li>
            <li><Link href="/projects#the-role-of-community" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to The Role of Community section">The Role of Community</Link></li>
          </ul>
        </div>

        {/* Work with Us */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2" id="footer-work-heading">Work with Us</h3>
          <ul className="space-y-1" role="list">
            <li><Link href="/careers#our-culture" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Our Culture section">Our Culture</Link></li>
            <li><Link href="/careers#careers-internships" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Careers & Internships section">Careers & Internships</Link></li>
            <li><Link href="/careers#explore-open-positions" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Explore Open Positions section">Explore Open Positions</Link></li>
            <li><Link href="/careers#internships" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Internships section">Internships</Link></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2" id="footer-connect-heading">Connect With Us</h3>
          <ul className="space-y-1" role="list">
            <li><Link href="/contact#contact-us" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Contact Us section">Contact Us</Link></li>
            <li><Link href="/contact#tule-in-your-county" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Tule in Your County section">Tule in Your County</Link></li>
            <li><Link href="/contact#report-a-concern" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Report a Concern section">Report a Concern</Link></li>
          </ul>
          <div className="flex space-x-4 mt-4" role="navigation" aria-label="Social Media Links">
            <a href="https://www.facebook.com/tule.initiative/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our Facebook page">
              <span className="text-purple-400">Facebook</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our YouTube channel">
              <span className="text-purple-400">YouTube</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our Twitter page">
              <span className="text-purple-400">Twitter</span>
            </a>
            <a href="https://www.instagram.com/tuleinitiative/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our Instagram page">
              <span className="text-purple-400">Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our LinkedIn page">
              <span className="text-purple-400">LinkedIn</span>
            </a>
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
              className="p-2 rounded-l text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
              disabled={isSubmitting}
              aria-label="Enter your email address to subscribe"
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 text-white p-2 rounded-r hover:bg-purple-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              disabled={isSubmitting}
              aria-label="Subscribe to newsletter"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {error && <p className="text-red-400 mt-2" role="alert" id="subscribe-error">{error}</p>}
          {success && <p className="text-green-400 mt-2" role="alert" id="subscribe-success">{success}</p>}
        </div>
        <p className="text-sm mt-2 md:mt-0">
          © 2025 Tule Initiative |{' '}
          <Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Privacy Policy page">Privacy Policy</Link> |{' '}
          <Link href="/terms" className="hover:text-purple-400 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Go to Terms of Use page">Terms of Use</Link>
        </p>
      </div>
    </footer>
  );
}