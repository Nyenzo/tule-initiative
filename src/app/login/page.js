'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { auth, signInWithEmailAndPassword, signInWithPopup, getGoogleProvider } from '../../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(`Login failed: ${err.message}`);
    }
  };

const handleGoogleLogin = async () => {
  try {
    console.log('Starting Google sign-in');
    const provider = getGoogleProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('Google sign-in completed', result);
    router.push('/dashboard');
  } catch (err) {
    setError(`Google sign-in failed: ${err.message}`);
  }
};

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-purple-600 text-white p-2 rounded w-full mb-2">
            Login with Email
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white p-2 rounded w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.621h5.739c-0.231,1.239-0.923,2.316-1.955,3.239c-0.923,0.824-2.078,1.385-3.462,1.385c-2.077,0-3.854-1.385-4.5-3.323c-0.277-0.877-0.415-1.8-0.415-2.762s0.138-1.885,0.415-2.762c0.646-1.938,2.423-3.323,4.5-3.323c1.385,0,2.539,0.561,3.462,1.385l2.769-2.769C17.231,3.554,14.769,2,12,2C6.477,2,2,6.477,2,12s4.477,10,10,10c2.769,0,5.231-1.554,6.923-4H12.545z"
            />
          </svg>
          Sign in with Google
        </button>
        <p className="mt-4 text-center">
          Forgot your password?{' '}
          <a href="/reset-password" className="text-purple-600 hover:underline">Reset Password</a>
        </p>
        <p className="mt-2 text-center">
          Don’t have an account? <a href="/register" className="text-purple-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}