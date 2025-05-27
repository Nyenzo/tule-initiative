'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Careers() {
  const [pageData, setPageData] = useState({ title: '', sections: [] });
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'pages', 'careers');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Careers page data from Firestore:', data); // Debug log
          setPageData({
            title: data.title || 'Work with Us',
            sections: data.sections || [],
          });
        } else {
          setPageData({ title: 'Work with Us', sections: [{ sectionTitle: 'Content Not Found', sectionContent: 'Content not found.' }] });
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
        setPageData({ title: 'Work with Us', sections: [{ sectionTitle: 'Error', sectionContent: 'Error loading content.' }] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Placeholder images for each section
  const sectionImages = {
    'Our Culture': {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Team members collaborating in a vibrant office environment',
    },
    'Careers & Internships': {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'A group of professionals discussing career opportunities',
    },
    'Explore Open Positions': {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Job listings on a computer screen',
    },
    'Internships': {
      url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      alt: 'Interns working together on a project',
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img && !img.classList.contains('animate-pop-up')) {
              img.classList.add('animate-pop-up');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [pageData.sections]);

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-8" role="status" aria-live="polite">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-8 pt-20" style={{ paddingTop: '80px' }}>
      <h1 className="text-3xl font-bold text-blue-800 mb-6">{pageData.title}</h1>
      {pageData.sections.map((section, index) => {
        if (!section.sectionTitle) {
          console.warn('Skipping section with missing sectionTitle:', section);
          return null;
        }
        const isEven = index % 2 === 0;
        const sectionId = section.sectionTitle.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
        const image = sectionImages[section.sectionTitle] || { url: 'https://via.placeholder.com/400', alt: 'Placeholder image' };

        return (
          <section
            key={index}
            id={sectionId}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="mb-8 flex flex-col md:flex-row items-center gap-6"
            aria-labelledby={`section-title-${sectionId}`}
          >
            <div className={`flex-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
              <h2 id={`section-title-${sectionId}`} className="text-2xl font-semibold text-yellow-400 mb-4">{section.sectionTitle}</h2>
              <p className="text-gray-700 whitespace-pre-line">{section.sectionContent || 'No content available.'}</p>
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