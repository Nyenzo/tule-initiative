'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { db, logAnalyticsEvent } from '../../../lib/firebase';
import { collection, query, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setError('');
    } catch (err) {
      setError(`Error fetching users: ${err.message}`);
      setSuccess('');
    }
  };

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    fetchUsers();
  }, [user]);

  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    if (!window.confirm(`Are you sure you want to ${currentIsAdmin ? 'remove admin status from' : 'make admin'} user ${userId}?`)) {
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { isAdmin: !currentIsAdmin }, { merge: true });
      setSuccess(`User ${userId} updated successfully`);
      logAnalyticsEvent('admin_toggle', { action: currentIsAdmin ? 'remove_admin' : 'make_admin', target_user_id: userId, admin_id: user.uid });
      fetchUsers();
    } catch (err) {
      setError(`Failed to update user: ${err.message}`);
      setSuccess('');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === user.uid) {
      setError('You cannot delete your own account from this page.');
      setSuccess('');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete user ${userId}? This action cannot be undone.`)) {
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      setSuccess(`User ${userId} deleted successfully`);
      logAnalyticsEvent('admin_delete_user', { target_user_id: userId, admin_id: user.uid });
      fetchUsers();
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
      setSuccess('');
    }
  };

  if (!user) return <p className="p-4">Please log in to view users.</p>;
  if (!user.isAdmin) return <p className="p-4">You must be an admin to view this page.</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">User List</h1>
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="border p-3">User ID</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Is Admin</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border p-3">{user.id}</td>
                  <td className="border p-3">{user.email || 'N/A'}</td>
                  <td className="border p-3">{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                      className={`p-2 rounded text-white ${user.isAdmin ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} transition-colors duration-200`}
                    >
                      {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                      disabled={user.id === user.uid}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/admin" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}