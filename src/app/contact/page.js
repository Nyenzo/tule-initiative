'use client';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Connect With Us</h1>

      {/* Contact Us Section */}
      <section id="contact-us" className="mb-8">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Contact Us</h2>
        <p className="text-gray-700">
          We’d love to hear from you! Reach out with any questions, feedback, or partnership inquiries.
        </p>
        <ul className="text-gray-700 mt-2">
          <li>Email: <a href="mailto:info@tuleinitiative.org" className="text-purple-600 hover:underline">info@tuleinitiative.org</a></li>
          <li>Phone: +254 123 456 789</li>
          <li>Address: 123 Community Lane, Nairobi, Kenya</li>
        </ul>
      </section>

      {/* Tule in Your County Section */}
      <section id="tule-in-your-county" className="mb-8">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Tule in Your County</h2>
        <p className="text-gray-700">
          Tule Initiative operates in various counties across Kenya and beyond. Find out if we’re active in your area or learn how to bring our programs to your community.
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Nairobi County - Education and Healthcare Programs</li>
          <li>Mombasa County - Talent Development Initiatives</li>
          <li>Kisumu County - Community Empowerment Workshops</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Want to collaborate? Email us at{' '}
          <a href="mailto:partnerships@tuleinitiative.org" className="text-purple-600 hover:underline">
            partnerships@tuleinitiative.org
          </a>.
        </p>
      </section>

      {/* Report a Concern Section */}
      <section id="report-a-concern" className="mb-8">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Report a Concern</h2>
        <p className="text-gray-700">
          We take all concerns seriously, whether they’re about our programs, staff, or operations. Please share your feedback so we can address any issues promptly.
        </p>
        <p className="text-gray-700 mt-2">
          Email your concern to{' '}
          <a href="mailto:concerns@tuleinitiative.org" className="text-purple-600 hover:underline">
            concerns@tuleinitiative.org
          </a>, and we’ll respond within 48 hours.
        </p>
      </section>
    </div>
  );
}