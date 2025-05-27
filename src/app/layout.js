// File: src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import Script from 'next/script';

// RootLayout Component: Provides the root layout for the Next.js app with global providers and components
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon: Set the favicon for the website */}
        <link rel="icon" href="/favicon.ico" />
        {/* Font Awesome CSS: Include Font Awesome styles for icon rendering */}
        <link
          rel="stylesheet"
          href="https://kit.fontawesome.com/0010d9344a.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Auth Provider: Wrap the app with AuthProvider for authentication context */}
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
        {/* Font Awesome Script: Load Font Awesome script for additional functionality (e.g., auto-replace SVG icons) */}
        <Script
          src="https://kit.fontawesome.com/0010d9344a.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}