import Link from 'next/link';

export default function Footer() {
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
            <li><Link href="/careers" className="hover:text-purple-400">Open Tenders</Link></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-2">Connect With Us</h3>
          <ul className="space-y-1">
            <li><Link href="/contact" className="hover:text-purple-400">Contact Us</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400">Tule in Your Country</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400">Report a Concern</Link></li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">Facebook</span></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">YouTube</span></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">Twitter</span></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">Instagram</span></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><span className="text-purple-400 hover:text-purple-300">LinkedIn</span></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
        <div className="flex items-center space-x-2">
          <input type="email" placeholder="Email Address" className="p-2 rounded-l text-black" />
          <button className="bg-purple-600 text-white p-2 rounded-r hover:bg-purple-700">Subscribe</button>
        </div>
        <p className="text-sm mt-2 md:mt-0">&copy; 2025 Tule Initiative | <a href="/privacy" className="hover:text-purple-400">Privacy Policy</a> | <a href="/terms" className="hover:text-purple-400">Terms of Use</a></p>
      </div>
    </footer>
  );
}