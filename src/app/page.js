'use client';

import Image from 'next/image';
import DonateButton from '../components/DonateButton';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(true); // Start with true to show the first image

  // Array of mission-related images (replace with your actual image paths)
  const missionImages = [
    {
      src: '/mission-photo-1.png',
      alt: 'Community members working together on a project',
    },
    {
      src: '/mission-photo-2.png',
      alt: 'People sharing a meal at a community event',
    },
    {
      src: '/mission-photo-3.jpg',
      alt: 'Volunteers planting trees in a group',
    },
  ];

  useEffect(() => {
    // Trigger fade-out before changing the image
    setIsImageLoaded(false);
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === missionImages.length - 1 ? 0 : prevIndex + 1
      );
      // Fade back in after the new image is set
      setIsImageLoaded(true);
    }, 500); // Short delay to allow fade-out

    const interval = setInterval(() => {
      setIsImageLoaded(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === missionImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsImageLoaded(true);
      }, 500);
    }, 15000); // Change image every 15 seconds

    return () => {
      clearTimeout(timeout);
      clearInterval(interval); // Cleanup on unmount
    };
  }, [missionImages.length]);

  return (
    <main className="min-h-screen bg-white" role="main">
      {/* Hero Section with Image and Description */}
      <section className="relative" aria-labelledby="hero-title">
        <Image
          src="/hero-image.jpg"
          alt="Tule Initiative Hero Image"
          width={1200}
          height={600}
          className="w-full h-96 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-700 bg-opacity-75 flex items-center justify-center text-center p-4 pt-16">
          <div>
            <h1 id="hero-title" className="text-4xl font-bold text-yellow-300 mb-4">Welcome to Tule Initiative</h1>
            <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
              Tule, meaning "let's eat" in Swahili, unites communities through talent and purpose. The community would come together and sow and in the end of a season feast together at the fruits of their labor. Tule basically uses the Dining Table aspect in a real life setting where we all come together to eat and enjoy the fruits of our work leaving no one behind.
            </p>
            <DonateButton />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="p-8 flex flex-col md:flex-row items-center justify-between" aria-labelledby="mission-title">
        <div className="md:w-1/2 p-4">
          <h2 id="mission-title" className="text-3xl font-bold text-blue-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Tule brings together people from diverse backgrounds to nurture their God-given talents,
            fostering unity and addressing social challenges through community-driven projects.
          </p>
        </div>
        <div className="md:w-1/2 p-4">
          <Image
            key={currentImageIndex} // Use key to trigger re-render on image change
            src={missionImages[currentImageIndex].src}
            alt={missionImages[currentImageIndex].alt}
            width={500}
            height={550}
            className="w-full h-auto object-cover rounded-lg transition-opacity duration-2000 ease-in-out"
            style={{ opacity: isImageLoaded ? 1 : 0 }} // Control opacity with state
            loading="lazy"
          />
        </div>
      </section>
      {/* Our Impact Section */}
      <section className="p-8 bg-gray-50" aria-labelledby="impact-title">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="impact-title" className="text-3xl font-bold text-blue-800 mb-6">Our Impact</h2>
          <p className="text-lg text-gray-700 mb-6">
            Since our inception, Tule has empowered over 50 community members, cultivated 2 local projects, and hosted 2 feasts to celebrate collective efforts. Join us in making a difference!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800">50+</h3>
              <p className="text-gray-600">Community Members Empowered</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800">2+</h3>
              <p className="text-gray-600">Local Projects</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800">2+</h3>
              <p className="text-gray-600">Community Feasts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="p-8" aria-labelledby="involve-title">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="involve-title" className="text-3xl font-bold text-blue-800 mb-6">Get Involved</h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you want to volunteer, donate, or partner with us, there are many ways to support Tule. Contact us today to get started!
          </p>
          <DonateButton />
          <button className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Contact Us
          </button>
        </div>
      </section>
    </main>
  );
}