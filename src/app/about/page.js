'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function About() {
  const [pageData, setPageData] = useState({ title: '', sections: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'pages', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPageData({
            title: data.title || 'Who We Are',
            sections: data.sections || [],
          });
        } else {
          setPageData({ title: 'Who We Are', sections: [{ sectionTitle: 'Content Not Found', sectionContent: 'Content not found.' }] });
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
        setPageData({ title: 'Who We Are', sections: [{ sectionTitle: 'Error', sectionContent: 'Error loading content.' }] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Placeholder images for each section
  const sectionImages = {
    'Our Vision & Values': {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'A group of people collaborating on a community project',
    },
    'Our History': {
      url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Historical photo of a community gathering in Nairobi',
    },
    'Our Leadership': {
      url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Professional headshots of the Tule Initiative leadership team',
    },
    'Our Structure': {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Diagram of Tule Initiative’s organizational structure',
    },
    'Our Partners': {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Representatives from partner organizations shaking hands',
    },
    'Accountability': {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Annual report documents on a desk',
    },
    'FAQ': {
      url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Person reading FAQ documents',
    },
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-8" role="status" aria-live="polite">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-8 pt-20" style={{ paddingTop: '80px' }}>
      <h1 className="text-3xl font-bold text-blue-800 mb-6">{pageData.title}</h1>
      {pageData.sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const sectionId = section.sectionTitle.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
        const image = sectionImages[section.sectionTitle] || { url: 'https://via.placeholder.com/400', alt: 'Placeholder image' };

        return (
          <section
            key={index}
            id={sectionId}
            className="mb-8 flex flex-col md:flex-row items-center gap-6"
            aria-labelledby={`section-title-${sectionId}`}
          >
            <div className={`flex-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
              <h2 id={`section-title-${sectionId}`} className="text-2xl font-semibold text-yellow-400 mb-4">{section.sectionTitle}</h2>
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