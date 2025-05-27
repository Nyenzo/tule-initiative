'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Projects() {
  const [pageData, setPageData] = useState({ title: '', sections: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'pages', 'projects');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPageData({
            title: data.title || 'What We Do',
            sections: data.sections || [],
          });
        } else {
          setPageData({ title: 'What We Do', sections: [{ sectionTitle: 'Content Not Found', sectionContent: 'Content not found.' }] });
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
        setPageData({ title: 'What We Do', sections: [{ sectionTitle: 'Error', sectionContent: 'Error loading content.' }] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Placeholder images for each section
  const sectionImages = {
    'Community Programs': {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Community members participating in a workshop',
    },
    'Talent Development': {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Young adults in a mentorship program',
    },
    'Our Global Strategy': {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Global map showing Tule Initiative’s project locations',
    },
    'The Role of Community': {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Local leaders engaging in a community meeting',
    },
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-8" role="status" aria-live="polite">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-8 pt-20" style={{ paddingTop: '60px' }}>
      <h1 className="text-3xl font-bold text-blue-800 mb-6">{pageData.title}</h1>
      {pageData.sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const sectionId = section.sectionTitle.toLowerCase().replace(/\s+/g, '-');
        const image = sectionImages[section.sectionTitle] || { url: 'https://via.placeholder.com/400', alt: 'Placeholder image' };

        return (
          <section
            key={index}
            id={sectionId}
            className="mb-8 flex flex-col md:flex-row items-center gap-6"
            aria-labelledby={`section-title-${sectionId}`}
          >
            <div className={`flex-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
              <h2 id={`section-title-${sectionId}`} className="text-2xl font-semibold text-yellow-300 mb-4">{section.sectionTitle}</h2>
              <p className="text-gray-700 whitespace-pre-line">{section.sectionContent}</p>
            </div>
            <div className={`flex-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </section>
        );
      })}
    </main>
  );
}