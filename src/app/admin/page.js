'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  if (!user || !user.isAdmin) return null;

  const handleSetAdmin = async (e) => {
    e.preventDefault();
    try {
      const functions = getFunctions();
      const setAdminRole = httpsCallable(functions, 'setAdminRole');
      const result = await setAdminRole({ email });
      setMessage(result.data.message);
      setError('');
    } catch (err) {
      setError(`Failed to set admin role: ${err.message}`);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">Welcome, {user.name}! You have admin privileges.</p>
      <h2 className="text-xl font-semibold text-blue-800 mb-2">Assign Admin Role</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSetAdmin} className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">User Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full">
          Make Admin
        </button>
      </form>
    </div>
  );
}