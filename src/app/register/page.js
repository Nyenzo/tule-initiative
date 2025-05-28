// File: src/app/register/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, getGoogleProvider, logAnalyticsEvent } from '../../lib/firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      logAnalyticsEvent('sign_up', { method: 'email', user_id: userCredential.user.uid });
      router.push('/dashboard');
    } catch (err) {
      setError(`Registration failed: ${err.message}`);
      console.error('Registration error:', err.code, err.message, err.stack);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = getGoogleProvider();
      const result = await signInWithPopup(auth, provider);
      logAnalyticsEvent('sign_up', { method: 'google', user_id: result.user.uid });
      router.push('/dashboard');
    } catch (err) {
      setError(`Google registration failed: ${err.message}`);
      console.error('Google registration error:', err.code, err.message, err.stack);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleEmailRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M21 21l-4.35-4.35" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Sign Up with Email
          </button>
        </form>
        <button
          onClick={handleGoogleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 mt-4 hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.621h5.739c-0.231,1.239-0.923,2.316-1.955,3.239c-0.923,0.824-2.078,1.385-3.462,1.385c-2.077,0-3.854-1.385-4.5-3.323c-0.277-0.877-0.415-1.8-0.415-2.762s0.138-1.885,0.415-2.762c0.646-1.938,2.423-3.323,4.5-3.323c1.385,0,2.539,0.561,3.462,1.385l2.769-2.769C17.231,3.554,14.769,2,12,2C6.477,2,2,6.477,2,12s4.477,10,10,10c2.769,0,5.231-1.554,6.923-4H12.545z"
            />
          </svg>
          Sign Up with Google
        </button>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}