'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { auth, signInWithEmailAndPassword, signInWithPopup, getGoogleProvider, logAnalyticsEvent } from '../../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      logAnalyticsEvent('login', { method: 'email', user_id: auth.currentUser.uid });
      router.push('/');
    } catch (err) {
      setError(`Login failed: ${err.message}`);
      console.error('Login error:', err.code, err.message, err.stack);
    }
  };

  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    setError('');
    try {
      const provider = getGoogleProvider();
      const result = await signInWithPopup(auth, provider);
      logAnalyticsEvent('login', { method: 'google', user_id: result.user.uid });
      router.push('/');
    } catch (err) {
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by the browser. Please allow popups for this site and try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Multiple sign-in attempts detected. Please try again.');
      } else {
        setError(`Google sign-in failed: ${err.message}`);
      }
      console.error('Google login error:', err.code, err.message, err.stack);
    } finally {
      setGoogleLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleEmailLogin} className="space-y-4">
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
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Login with Email
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 mt-4 hover:bg-blue-700 transition-colors duration-200"
          disabled={googleLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.621h5.739c-0.231,1.239-0.923,2.316-1.955,3.239c-0.923,0.824-2.078,1.385-3.462,1.385c-2.077,0-3.854-1.385-4.5-3.323c-0.277-0.877-0.415-1.8-0.415-2.762s0.138-1.885,0.415-2.762c0.646-1.938,2.423-3.323,4.5-3.323c1.385,0,2.539,0.561,3.462,1.385l2.769-2.769C17.231,3.554,14.769,2,12,2C6.477,2,2,6.477,2,12s4.477,10,10,10c2.769,0,5.231-1.554,6.923-4H12.545z"
            />
          </svg>
          {googleLoading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        <p className="mt-4 text-center">
          Forgot your password?{' '}
          <a href="/reset-password" className="text-purple-600 hover:underline">Reset Password</a>
        </p>
        <p className="mt-2 text-center">
          Don’t have an account? <a href="/register" className="text-purple-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}