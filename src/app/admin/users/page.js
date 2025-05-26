'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        const userList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (err) {
        setError(`Error fetching users: ${err.message}`);
      }
    };

    fetchUsers();
  }, [user]);

  if (!user) return <p>Please log in to view users.</p>;
  if (!user.isAdmin) return <p>You must be an admin to view this page.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.email || 'N/A'}</td>
              <td className="border p-2">{user.isAdmin ? 'Yes' : 'No'}</td>
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