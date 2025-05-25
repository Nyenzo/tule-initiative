'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Donations() {
  const { user, loading } = useAuth();
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      window.location.href = '/login'; // Redirect non-admins
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user || !user.isAdmin) return;
      try {
        const q = query(collection(db, 'donations'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const donationsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(donationsList);
        const total = donationsList.reduce((sum, d) => sum + (d.amount || 0), 0);
        setTotalAmount(total);
      } catch (err) {
        setError(`Error fetching donations: ${err.message}`);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchDonations();
  }, [user]);

  if (loading || fetchLoading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  if (!user || !user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Donation Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="mb-4">Total Donations: ${totalAmount.toFixed(2)}</p>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">User ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="border-b">
                <td className="p-2">{donation.userId}</td>
                <td className="p-2">${donation.amount.toFixed(2)}</td>
                <td className="p-2">{donation.timestamp?.toDate().toLocaleString() || 'N/A'}</td>
                <td className="p-2">{donation.status}</td>
                <td className="p-2">{donation.transactionId || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}