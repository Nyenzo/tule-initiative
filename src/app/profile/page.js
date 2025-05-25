'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { auth, updateProfile } from '../../lib/firebase';

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      setName(user.name || '');
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (err) {
      setError(`Failed to update profile: ${err.message}`);
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full">
          Update Profile
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        Email: {user.email} {user.emailVerified ? '(Verified)' : '(Not Verified)'}
      </p>
    </div>
  );
}