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

  if (loading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  if (!user) return null;

  const isEmailPasswordUser = auth.currentUser?.providerData.some(
    (provider) => provider.providerId === 'password'
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, {user.name}!</p>
      {isEmailPasswordUser && !user.emailVerified && (
        <p className="text-red-500 mt-2">
          Please verify your email to access all features. Check your inbox for a verification email.
        </p>
      )}
    </div>
  );
}