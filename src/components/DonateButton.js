'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DonateButton({ isOpen, setIsOpen }) {
  const { user, loading: authLoading } = useAuth();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

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
    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    setIsConfirming(true);
    try {
      const result = await simulateTransaction(amount);
      if (!result.success) {
        throw new Error('Transaction failed. Please try again.');
      }
      console.log('User before addDoc:', user);
      if (!user.uid) {
        throw new Error('User UID is undefined. Please log in again.');
      }
      const donationData = {
        userId: user.uid,
        amount: parseFloat(amount),
        paymentMethod: paymentMethod,
        timestamp: serverTimestamp(),
        status: 'completed',
        transactionId: result.transactionId,
      };
      console.log('Donation data before addDoc:', donationData);
      await addDoc(collection(db, 'donations'), donationData);
      setSuccess('Donation confirmed and recorded!');
      setAmount('');
      setPaymentMethod('');
      setIsOpen(false); // Close the modal on successful donation
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsConfirming(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="relative">
      <button
        className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
        onClick={() => setIsOpen(true)} // Open modal on click
      >
        Donate
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)} // Close on backdrop click
          />
          {/* Modal */}
          <div className="relative bg-gradient-to-br from-gray-100 to-blue-50 p-6 rounded-lg shadow-lg w-full max-w-md z-10">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
              aria-label="Close donation modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <form id="donateForm" onSubmit={handleDonate} className="space-y-4">
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
              <div className="mb-2">
                <label className="block text-gray-700">Payment Method</label>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-1 border rounded"
                    required
                    disabled={isConfirming || authLoading}
                  >
                    <option value="">Select a payment method</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Stripe">Stripe</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                  </select>
                  <div className="flex gap-2">
                    {paymentMethod === 'M-Pesa' && <i className="fas fa-mobile-alt text-lg text-gray-600" title="M-Pesa"></i>}
                    {paymentMethod === 'Stripe' && <i className="fab fa-cc-stripe text-lg text-gray-600" title="Stripe"></i>}
                    {paymentMethod === 'Visa' && <i className="fab fa-cc-visa text-lg text-gray-600" title="Visa"></i>}
                    {paymentMethod === 'Mastercard' && <i className="fab fa-cc-mastercard text-lg text-gray-600" title="Mastercard"></i>}
                  </div>
                </div>
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
        </div>
      )}
    </div>
  );
}