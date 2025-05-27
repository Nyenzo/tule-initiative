// File: src/app/edit-content/[pageId]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// EditContent Component: Allows admins to edit sectioned content for specific pages
export default function EditContent() {
  // State Management: Initialize states for user authentication, page data, and form status
  const { user, loading } = useAuth();
  const router = useRouter();
  const { pageId } = useParams();
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([]); // Array of sections with sectionTitle and sectionContent
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Authentication Check: Redirect to login if the user is not an admin
  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch Page Data: Retrieve the page data from Firestore based on the pageId
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.isAdmin) return;
      try {
        const docRef = doc(db, 'pages', pageId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setSections(data.sections || []); // Load sections or empty array if none exist
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

  // Update Section Field: Handle changes to section fields (title or content) by index
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
  };

  // Add New Section: Append a new empty section to the sections array
  const handleAddSection = () => {
    setSections([...sections, { sectionTitle: '', sectionContent: '' }]);
  };

  // Delete Section: Remove a section from the sections array by index
  const handleDeleteSection = (index) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      const updatedSections = sections.filter((_, i) => i !== index);
      setSections(updatedSections);
    }
  };

  // Form Submission: Update the Firestore document with the new title and sections
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const docRef = doc(db, 'pages', pageId);
      await updateDoc(docRef, { title, sections });
      setSuccess('Content updated successfully!');
    } catch (err) {
      setError(`Error updating content: ${err.message}`);
    }
  };

  // Loading State: Display a loading message while authentication or data fetching is in progress
  if (loading || fetchLoading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;

  // Access Control: Return null if the user is not authenticated or not an admin
  if (!user || !user.isAdmin) return null;

  // Form Rendering: Display the form to edit the page title and sections dynamically
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-20" style={{ paddingTop: '80px' }}>
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Edit Content: {pageId}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        {/* Title Input: Allow editing of the page title */}
        <div className="mb-4">
          <label className="block text-gray-700">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Sections Editor: Render input fields for each section with options to edit or delete */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Sections</h2>
          {sections.map((section, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
              <div className="mb-2">
                <label className="block text-gray-700">Section Title</label>
                <input
                  type="text"
                  value={section.sectionTitle}
                  onChange={(e) => handleSectionChange(index, 'sectionTitle', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Section Content</label>
                <textarea
                  value={section.sectionContent}
                  onChange={(e) => handleSectionChange(index, 'sectionContent', e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="5"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleDeleteSection(index)}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors duration-200"
              >
                Delete Section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSection}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200 mb-4"
          >
            Add New Section
          </button>
        </div>

        {/* Submit Button: Save changes to Firestore */}
        <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}