'use client';

import Link from 'next/link';
import Image from 'next/image';
import DonateButton from './DonateButton';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav 
      className="absolute top-4 left-0 right-0 mx-4 z-20 bg-opacity-90 text-yellow-300 p-2 flex justify-between items-center rounded-lg shadow-lg"
      style={{
        backgroundImage: `url('/navbar-pattern.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60px'
      }}
    >
      <Link href="/">
        <Image src="/tule-logo.png" alt="Tule Initiative Logo" width={150} height={50} />
      </Link>
      <div className="space-x-4">
        <Link href="/about" className="hover:underline text-sm">Who We Are</Link>
        {user?.isAdmin && <Link href="/edit-content/about" className="hover:underline text-sm text-purple-600">[Edit]</Link>}
        <Link href="/projects" className="hover:underline text-sm">What We Do</Link>
        {user?.isAdmin && <Link href="/edit-content/projects" className="hover:underline text-sm text-purple-600">[Edit]</Link>}
        <Link href="/media" className="hover:underline text-sm">Media</Link>
        {user?.isAdmin && <Link href="/edit-content/media" className="hover:underline text-sm text-purple-600">[Edit]</Link>}
        {user ? (
          <>
            <Link href="/profile" className="hover:underline text-sm">Profile</Link>
            {user.isAdmin && <Link href="/admin" className="hover:underline text-sm">Admin</Link>}
            <button
              onClick={async () => {
                await logout();
                console.log('Logout button clicked');
              }}
              className="hover:underline text-sm text-purple-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline text-sm">Login</Link>
            <Link href="/register" className="hover:underline text-sm">Sign Up</Link>
          </>
        )}
        {user?.isAdmin && <Link href="/donations" className="hover:underline text-sm">Donations</Link>}
        <DonateButton />
      </div>
    </nav>
  );
}