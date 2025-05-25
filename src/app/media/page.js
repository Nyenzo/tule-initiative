'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Media() {
  const [pageData, setPageData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'pages', 'media');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          setPageData({ title: 'Media', content: 'Content not found.' });
        }
      } catch (error) {
        console.error('Error fetching page data:', error);
        setPageData({ title: 'Media', content: 'Error loading content.' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">{pageData.title}</h1>
      <p className="text-gray-700">{pageData.content}</p>
    </div>
  );
}