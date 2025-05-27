'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const isEmailPasswordUser = auth.currentUser?.providerData.some(
    (provider) => provider.providerId === 'password'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl text-gray-700 mb-4">Welcome, {user.name || user.email.split('@')[0]}!</p>
          {isEmailPasswordUser && !user.emailVerified && (
            <p className="text-red-500 mb-4">
              Please verify your email to access all features. Check your inbox for a verification email.
            </p>
          )}
          <button
            onClick={() => router.push('/profile')}
            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}