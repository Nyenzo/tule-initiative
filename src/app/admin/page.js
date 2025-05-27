'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Link from 'next/link';

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

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Admin Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <p className="text-xl text-gray-700 mb-4">Welcome, {user.name || 'Admin'}! You have admin privileges.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Assign Admin Role</h2>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSetAdmin} className="space-y-4">
              <div>
                <label className="block text-gray-700">User Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 w-full"
              >
                Make Admin
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/users" className="text-blue-600 hover:underline">
                  View User List
                </Link>
              </li>
              <li>
                <Link href="/donations" className="text-blue-600 hover:underline">
                  View Donations
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}