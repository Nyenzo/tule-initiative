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
              <svg className="w-6 h-6 text-purple-400 hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our YouTube channel">
              <svg className="w-6 h-6 text-purple-400 hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a2.996 2.996 0 00-2.112-2.112C19.314 3.5 12 3.5 12 3.5s-7.314 0-9.386.574a2.996 2.996 0 00-2.112 2.112C0 8.258 0 12 0 12s0 3.742.502 5.814a2.996 2.996 0 002.112 2.112c2.072.574 9.386.574 9.386.574s7.314 0 9.386-.574a2.996 2.996 0 002.112-2.112C24 15.742 24 12 24 12s0-3.742-.502-5.814zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our Twitter page">
              <svg className="w-6 h-6 text-purple-400 hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/tuleinitiative/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our Instagram page">
              <svg className="w-6 h-6 text-purple-400 hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.02.047 1.717.207 2.328.437a4.678 4.678 0 011.672 1.09 4.678 4.678 0 011.09 1.672c.23.611.39 1.308.437 2.328.047 1.024.06 1.378.06 3.808s-.013 2.784-.06 3.808c-.047 1.02-.207 1.717-.437 2.328a4.678 4.678 0 01-1.09 1.672 4.678 4.678 0 01-1.672 1.09c-.611.23-1.308.39-2.328.437-1.024.047-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.02-.047-1.717-.207-2.328-.437a4.678 4.678 0 01-1.672-1.09 4.678 4.678 0 01-1.09-1.672c-.23-.611-.39-1.308-.437-2.328C2.013 14.784 2 14.43 2 12s.013-2.784.06-3.808c.047-1.02.207-1.717.437-2.328a4.678 4.678 0 011.09-1.672 4.678 4.678 0 011.672-1.09c.611-.23 1.308-.39 2.328-.437C9.53 2.013 9.884 2 12.315 2zm0 1.5c-2.43 0-2.754.013-3.732.06-.947.044-1.593.193-2.16.411a3.18 3.18 0 00-1.154.748 3.18 3.18 0 00-.748 1.154c-.218.567-.367 1.213-.411 2.16-.047.978-.06 1.302-.06 3.732s.013 2.754.06 3.732c.044.947.193 1.593.411 2.16a3.18 3.18 0 00.748 1.154 3.18 3.18 0 001.154.748c.567.218 1.213.367 2.16.411.978.047 1.302.06 3.732.06s2.754-.013 3.732-.06c.947-.044 1.593-.193 2.16-.411a3.18 3.18 0 001.154-.748 3.18 3.18 0 00.748-1.154c.218-.567.367-1.213.411-2.16.047-.978.06-1.302.06-3.732s-.013-2.754-.06-3.732c-.044-.947-.193-1.593-.411-2.16a3.18 3.18 0 00-.748-1.154 3.18 3.18 0 00-1.154-.748c-.567-.218-1.213-.367-2.16-.411-.978-.047-1.302-.06-3.732-.06zm0 4.665a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.5a3 3 0 110-6 3 3 0 010 6zm5.835-7.335a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Visit our LinkedIn page">
              <svg className="w-6 h-6 text-purple-400 hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.85 0-2.132 1.444-2.132 2.938v5.668H9.357V9.5h3.414v1.548h.048c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.799zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zm1.776 13.019H3.56V9.5h3.553v10.952zM22.225 0H1.771C.792 0 0 .792 0 1.771v20.457C0 23.208.792 24 1.771 24h20.452c.979 0 1.771-.792 1.771-1.771V1.771C24 .792 23.208 0 22.225 0z" />
              </svg>
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