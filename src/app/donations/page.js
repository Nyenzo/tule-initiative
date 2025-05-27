// File: src/app/donations/page.js
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';

// Donations Component: Displays a list of donations with user names for admin users
export default function Donations() {
  // State Management: Initialize states for user authentication, donations list, user names, and fetch status
  const { user, loading } = useAuth();
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [userNames, setUserNames] = useState({}); // Store user names mapped by userId

  // Authentication Check: Redirect to login if the user is not an admin
  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      window.location.href = '/login'; // Redirect non-admins
    }
  }, [user, loading]);

  // Fetch Donations and User Names: Retrieve donation data and map user names from Firestore
  useEffect(() => {
    const fetchDonationsAndUsers = async () => {
      if (!user || !user.isAdmin) return;
      try {
        // Fetch donations
        const q = query(collection(db, 'donations'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const donationsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(donationsList);

        // Calculate total amount in KES
        const total = donationsList.reduce((sum, d) => sum + (d.amount || 0), 0);
        setTotalAmount(total);

        // Fetch user names for each donation
        const userIds = [...new Set(donationsList.map(d => d.userId))]; // Unique user IDs
        const userNamesMap = {};
        await Promise.all(
          userIds.map(async (userId) => {
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              userNamesMap[userId] = userData.name || userData.email || 'Unknown User';
            } else {
              userNamesMap[userId] = 'Unknown User';
            }
          })
        );
        setUserNames(userNamesMap);
      } catch (err) {
        setError(`Error fetching donations or users: ${err.message}`);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchDonationsAndUsers();
  }, [user]);

  // Loading State: Display a loading message while authentication or data fetching is in progress
  if (loading || fetchLoading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;

  // Access Control: Return null if the user is not authenticated or not an admin
  if (!user || !user.isAdmin) return null;

  // Donations Table Rendering: Display a table of donations with user names and total amount in KES
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-20" style={{ paddingTop: '80px' }}>
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Donation Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="mb-4">Total Donations: KSh {totalAmount.toFixed(2)}</p>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">User</th>
              <th className="p-2">Amount (KSh)</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="border-b">
                <td className="p-2">{userNames[donation.userId] || 'Loading...'}</td>
                <td className="p-2">KSh {donation.amount.toFixed(2)}</td>
                <td className="p-2">{donation.paymentMethod || 'N/A'}</td>
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