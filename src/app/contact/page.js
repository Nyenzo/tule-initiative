'use client';

export default function Contact() {
  // Placeholder images for each section
  const sectionImages = {
    'Contact Us': {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'A person working at a desk with a laptop and phone',
    },
    'Tule in Your County': {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'A map of Kenya highlighting Nairobi County',
    },
    'Report a Concern': {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'A person writing a report at a desk',
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-8 pt-20" style={{ paddingTop: '80px' }}>
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Connect With Us</h1>

      {/* Contact Us Section */}
      <section id="contact-us" className="mb-8 flex flex-col md:flex-row items-center gap-6" aria-labelledby="section-title-contact-us">
        <div className="flex-1 md:order-1">
          <h2 id="section-title-contact-us" className="text-2xl font-semibold text-yellow-400 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            We’d love to hear from you! Reach out with any questions, feedback, or partnership inquiries.
          </p>
          <ul className="text-gray-700 mt-2">
            <li>Email: <a href="mailto:tule.initiative@gmail.com" className="text-purple-600 hover:underline" aria-label="Email Tule Initiative">tule.initiative@gmail.com</a></li>
            <li>Phone: <a href="tel:+254792707274" className="text-purple-600 hover:underline" aria-label="Call Tule Initiative at +254 792707274">+254 792707274</a></li>
            <li>Address: Nairobi, Kenya</li>
          </ul>
        </div>
        <div className="flex-1 md:order-2">
          <img
            src={sectionImages['Contact Us'].url}
            alt={sectionImages['Contact Us'].alt}
            className="w-full h-64 object-cover rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* Tule in Your County Section */}
      <section id="tule-in-your-county" className="mb-8 flex flex-col md:flex-row items-center gap-6" aria-labelledby="section-title-tule-in-your-county">
        <div className="flex-1 md:order-2">
          <h2 id="section-title-tule-in-your-county" className="text-2xl font-semibold text-yellow-400 mb-4">Tule in Your County</h2>
          <p className="text-gray-700">
            Tule Initiative operates in Kenya. Find out if we’re active in your area or learn how to bring our programs to your community.
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Currently Tule only operates in Nairobi County, but we will keep you updated if that changes.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Want to collaborate? Email us at{' '}
            <a href="mailto:tule.initiative@gmail.com" className="text-purple-600 hover:underline" aria-label="Email Tule Initiative for collaboration">tule.initiative@gmail.com</a>.
          </p>
        </div>
        <div className="flex-1 md:order-1">
          <img
            src={sectionImages['Tule in Your County'].url}
            alt={sectionImages['Tule in Your County'].alt}
            className="w-full h-64 object-cover rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* Report a Concern Section */}
      <section id="report-a-concern" className="mb-8 flex flex-col md:flex-row items-center gap-6" aria-labelledby="section-title-report-a-concern">
        <div className="flex-1 md:order-1">
          <h2 id="section-title-report-a-concern" className="text-2xl font-semibold text-yellow-400 mb-4">Report a Concern</h2>
          <p className="text-gray-700">
            We take all concerns seriously, whether they’re about our programs, staff, or operations. Please share your feedback so we can address any issues promptly.
          </p>
          <p className="text-gray-700 mt-2">
            Email your concern to{' '}
            <a href="mailto:tule.initiative@gmail.com" className="text-purple-600 hover:underline" aria-label="Email Tule Initiative to report a concern">tule.initiative@gmail.com</a>, and we’ll respond within 48 hours.
          </p>
        </div>
        <div className="flex-1 md:order-2">
          <img
            src={sectionImages['Report a Concern'].url}
            alt={sectionImages['Report a Concern'].alt}
            className="w-full h-64 object-cover rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}