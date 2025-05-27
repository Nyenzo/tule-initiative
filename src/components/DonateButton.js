// File: src/app/components/DonateButton.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// DonateButton Component: Displays a modal with payment method icons and a form for donation submission
export default function DonateButton({ isOpen, setIsOpen }) {
  // State Management: Initialize states for form data, payment selection, feedback, and confirmation status
  const { user, loading: authLoading } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState(null); // Tracks the selected payment method
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const modalRef = useRef(null); // Reference for focus trapping and modal container
  const firstFocusableRef = useRef(null); // Reference to the first focusable element in the modal

  console.log('DonateButton initial state:', { user, authLoading });

  // Payment Methods: Define the list of payment methods with their icons
  const paymentMethods = [
    { name: 'M-Pesa', icon: 'fas fa-mobile-alt' },
    { name: 'Stripe', icon: 'fab fa-cc-stripe' },
    { name: 'Visa', icon: 'fab fa-cc-visa' },
    { name: 'Mastercard', icon: 'fab fa-cc-mastercard' },
  ];

  // Transaction Simulation: Simulate a payment transaction with a random success rate
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

  // Donation Submission: Handle form submission with validation and transaction processing
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
    if (!selectedMethod) {
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
        paymentMethod: selectedMethod,
        timestamp: serverTimestamp(),
        status: 'completed',
        transactionId: result.transactionId,
      };
      console.log('Donation data before addDoc:', donationData);
      await addDoc(collection(db, 'donations'), donationData);
      setSuccess('Donation confirmed and recorded!');
      setAmount('');
      setSelectedMethod(null); // Reset payment method selection
      setIsOpen(false); // Close the modal on successful donation
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsConfirming(false);
    }
  };

  // Focus Trapping and Keyboard Handling: Manage focus within the modal and handle key events
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (firstFocusable) {
      firstFocusableRef.current = firstFocusable;
      firstFocusable.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedMethod(null); // Reset payment method on close
      } else if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Reset State on Modal Close: Ensure form state is reset when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedMethod(null);
      setAmount('');
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  // Loading State: Display nothing while authentication is loading to prevent form rendering
  if (authLoading) return null;

  // Modal Rendering: Display the donation modal with payment method icons or payment form based on selection
  return (
    <div className="relative">
      <button
        className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
        onClick={() => setIsOpen(true)}
        aria-label="Open donation form"
        aria-expanded={isOpen}
      >
        Donate
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
                setSelectedMethod(null);
              }
            }}
            aria-hidden="true"
          />
          {/* Modal */}
          <div
            ref={modalRef}
            role="dialog"
            aria-labelledby="donateModalTitle"
            aria-describedby="donateModalDescription"
            className="relative bg-gradient-to-br from-gray-100 to-blue-50 p-6 rounded-lg shadow-lg w-full max-w-md z-10"
          >
            <h2 id="donateModalTitle" className="sr-only">Donation Form</h2>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setIsOpen(false);
                setSelectedMethod(null);
              }}
              aria-label="Close donation form"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div aria-live="polite">
              {error && <p id="donateModalDescription" className="text-red-500 mb-2" aria-invalid="true">{error}</p>}
              {success && <p id="donateModalDescription" className="text-green-500 mb-2" aria-invalid="false">{success}</p>}
            </div>
            <div className="mb-2">
              <p className="text-gray-700">Donating as: {user?.name || user?.email || 'Guest'}</p>
            </div>
            {!selectedMethod ? (
              // Payment Method Selection: Display icons for each payment method
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Select a Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.name}
                      onClick={() => setSelectedMethod(method.name)}
                      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
                      aria-label={`Select ${method.name} as payment method`}
                    >
                      <i className={`${method.icon} text-3xl text-gray-600 mb-2`} />
                      <span className="text-gray-700">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Payment Form: Display the donation form for the selected payment method
              <form onSubmit={handleDonate} className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Donate with {selectedMethod}</h3>
                <div className="mb-2">
                  <label className="block text-gray-700" htmlFor="donateAmount">Amount</label>
                  <input
                    id="donateAmount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-1 border rounded"
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    required
                    aria-required="true"
                    disabled={isConfirming || authLoading}
                    aria-describedby="donateAmountError"
                  />
                  {error && amount && (isNaN(amount) || amount <= 0) && <span id="donateAmountError" className="text-red-500 text-sm">Invalid amount</span>}
                </div>
                {/* Mock Payment Details: Display fields specific to the selected payment method */}
                {selectedMethod === 'M-Pesa' && (
                  <div className="mb-2">
                    <label className="block text-gray-700" htmlFor="mpesaPhone">Phone Number</label>
                    <input
                      id="mpesaPhone"
                      type="text"
                      className="w-full p-1 border rounded"
                      placeholder="e.g., +254712345678"
                      disabled={isConfirming || authLoading}
                    />
                    <p className="text-sm text-gray-600 mt-1">Enter your M-Pesa registered phone number.</p>
                  </div>
                )}
                {(selectedMethod === 'Visa' || selectedMethod === 'Mastercard') && (
                  <div className="mb-2">
                    <label className="block text-gray-700" htmlFor="cardNumber">Card Number</label>
                    <input
                      id="cardNumber"
                      type="text"
                      className="w-full p-1 border rounded"
                      placeholder="e.g., 1234 5678 9012 3456"
                      disabled={isConfirming || authLoading}
                    />
                    <p className="text-sm text-gray-600 mt-1">Enter your card number for payment.</p>
                  </div>
                )}
                {selectedMethod === 'Stripe' && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Stripe payment will redirect to a secure payment page after submission.</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod(null)}
                    className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors duration-200"
                    disabled={isConfirming || authLoading}
                    aria-label="Go back to payment method selection"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors duration-200 flex-1"
                    disabled={isConfirming || authLoading}
                    aria-label="Submit donation"
                  >
                    {isConfirming ? 'Processing...' : 'Submit Donation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}