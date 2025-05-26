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

  if (loading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">{pageData.title}</h1>
      {pageData.sections.map((section, index) => (
        <section key={index} id={section.sectionTitle.toLowerCase().replace(/\s+/g, '-')} className="mb-8">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">{section.sectionTitle}</h2>
          <p className="text-gray-700 whitespace-pre-line">{section.sectionContent}</p>
        </section>
      ))}
    </div>
  );
}