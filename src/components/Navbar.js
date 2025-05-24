import Link from 'next/link';
import Image from 'next/image';
import DonateButton from './DonateButton';

export default function Navbar() {
  return (
    <nav 
      className="absolute top-4 left-0 right-0 mx-4 z-20 bg-opacity-90 text-yellow-300 p-2 flex justify-between items-center rounded-lg shadow-lg"
      style={{
        backgroundImage: `url('/navbar-pattern.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60px' // Match logo height
      }}
    >
      <Link href="/">
        <Image src="/tule-logo.png" alt="Tule Initiative Logo" width={150} height={50} />
      </Link>
      <div className="space-x-4">
        <Link href="/about" className="hover:underline text-sm">Who We Are</Link>
        <Link href="/projects" className="hover:underline text-sm">What We Do</Link>
        <Link href="/media" className="hover:underline text-sm">Media</Link>
        <DonateButton />
      </div>
    </nav>
  );
}