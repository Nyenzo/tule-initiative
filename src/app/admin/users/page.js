'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../lib/firebase';
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
      fetchUsers(); // Refresh the user list
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
      fetchUsers(); // Refresh the user list
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
      setSuccess('');
    }
  };

  if (!user) return <p className="p-4">Please log in to view users.</p>;
  if (!user.isAdmin) return <p className="p-4">You must be an admin to view this page.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Is Admin</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.email || 'N/A'}</td>
              <td className="border p-2">{user.isAdmin ? 'Yes' : 'No'}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                  className={`p-1 rounded text-white ${user.isAdmin ? 'bg-orange-600' : 'bg-green-600'}`}
                >
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-1 rounded bg-red-600 text-white"
                  disabled={user.id === user.uid}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/admin" className="mt-4 inline-block text-blue-600 hover:underline">
        Back to Admin Dashboard
      </Link>
    </div>
  );
}