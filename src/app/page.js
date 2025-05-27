'use client';

import Image from 'next/image';
import DonateButton from '../components/DonateButton';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === missionImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // Change image every 15 seconds
    return () => clearInterval(interval); // Cleanup on unmount
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
            key={currentImageIndex} // Use key to trigger transition on image change
            src={missionImages[currentImageIndex].src}
            alt={missionImages[currentImageIndex].alt}
            width={500}
            height={550}
            className="w-full h-auto object-cover rounded-lg transition-opacity duration-2000 ease-in-out opacity-100"
            style={{ opacity: 0 }} // Start with opacity 0
            onLoadingComplete={(img) => img.classList.add('opacity-100')} // Fade in after loading
            onLoadStart={(img) => img.classList.remove('opacity-100')} // Fade out before loading new image
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}