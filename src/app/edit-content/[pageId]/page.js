'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { pageId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.isAdmin) return;
      try {
        const docRef = doc(db, 'pages', pageId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setContent(data.content || '');
        } else {
          setError('Page not found.');
        }
      } catch (err) {
        setError(`Error fetching content: ${err.message}`);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchData();
  }, [pageId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const docRef = doc(db, 'pages', pageId);
      await updateDoc(docRef, { title, content });
      setSuccess('Content updated successfully!');
    } catch (err) {
      setError(`Error updating content: ${err.message}`);
    }
  };

  if (loading || fetchLoading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  if (!user || !user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Edit Content: {pageId}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}