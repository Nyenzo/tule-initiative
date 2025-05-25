'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DonateButton() {
  const { user, loading: authLoading } = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  // Add logging at the component level
  console.log('DonateButton initial state:', { user, authLoading });

  const simulateTransaction = async (amount) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2;
        resolve({
          success: isSuccess,
          transactionId: isSuccess ? `mock-txn-${Date.now()}` : null,
        });
      }, 2000);
    });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Log state at form submission
    console.log('handleDonate state:', { user, authLoading });
    if (authLoading) {
      setError('Authentication is still loading. Please wait.');
      return;
    }
    if (!user) {
      setError('Please log in to donate.');
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setIsConfirming(true);
    try {
      const result = await simulateTransaction(amount);
      if (!result.success) {
        throw new Error('Transaction failed. Please try again.');
      }
      // Debug user before addDoc
      console.log('User before addDoc:', user);
      if (!user.uid) {
        throw new Error('User UID is undefined. Please log in again.');
      }
      await addDoc(collection(db, 'donations'), {
        userId: user.uid,
        amount: parseFloat(amount),
        timestamp: serverTimestamp(),
        status: 'completed',
        transactionId: result.transactionId,
      });
      setSuccess('Donation confirmed and recorded!');
      setAmount('');
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsConfirming(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="relative group">
      <button
        className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('donateForm').classList.toggle('hidden');
        }}
      >
        Donate
      </button>
      <form
        id="donateForm"
        onSubmit={handleDonate}
        className="hidden absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-10 w-64"
      >
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <div className="mb-2">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-1 border rounded"
            min="1"
            step="0.01"
            placeholder="Enter amount"
            required
            disabled={isConfirming || authLoading}
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white p-1 rounded w-full disabled:bg-gray-400"
          disabled={isConfirming || authLoading}
        >
          {isConfirming ? 'Processing...' : 'Submit Donation'}
        </button>
      </form>
    </div>
  );
}