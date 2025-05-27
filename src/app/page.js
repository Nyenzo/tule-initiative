'use client';

import Image from 'next/image';
import DonateButton from '../components/DonateButton';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(true); // Start with true to show the first image
  const [isDonateOpen, setIsDonateOpen] = useState(false); // State to control DonateButton modal
  const impactRef = useRef(null);
  const { user } = useAuth();

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
    {
      src: '/mission-photo-4.png',
      alt: 'Volunteers planting trees in a group',
    },
    {
      src: '/mission-photo-5.jpeg',
      alt: 'Volunteers planting trees in a group',
    },
  ];

  useEffect(() => {
    let timeoutId;

    const handleImageTransition = () => {
      setIsImageLoaded(false); // Start fade-out
      timeoutId = setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === missionImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsImageLoaded(true); // Fade back in after new image is set
      }, 500); // Duration of fade-out
    };

    const interval = setInterval(() => {
      handleImageTransition();
    }, 15000); // Change image every 15 seconds

    // Initial call to start the cycle
    handleImageTransition();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval); // Cleanup on unmount
    };
  }, [missionImages.length]);

  // Handle scroll-triggered animation for impact section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.impact-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-pop-up');
              }, index * 200); // Staggered animation
            });
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => {
      if (impactRef.current) {
        observer.unobserve(impactRef.current);
      }
    };
  }, []);

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
            <h1 id="hero-title" className="text-4xl font-bold text-yellow-300 mb-4">
              {user && user.displayName ? `Welcome ${user.displayName.split(' ')[0]} to Tule Initiative` : 'Welcome to Tule Initiative'}
            </h1>
            <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
              Tule, meaning "let's eat" in Swahili, unites communities through talent and purpose. The community would come together and sow and in the end of a season feast together at the fruits of their labor. Tule basically uses the Dining Table aspect in a real life setting where we all come together to eat and enjoy the fruits of our work leaving no one behind.
            </p>
            <Link href="/projects">
              <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                Learn More
              </button>
            </Link>
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
            className="w-full h-auto object-cover rounded-lg transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isImageLoaded ? 1 : 0 }} // Control opacity with state
            loading="lazy"
          />
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="p-8 bg-gray-50" aria-labelledby="impact-title" ref={impactRef}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="impact-title" className="text-3xl font-bold text-blue-800 mb-6">Our Impact</h2>
          <p className="text-lg text-gray-700 mb-6">
            Since our inception, Tule has empowered over 50 community members, cultivated 2 local projects, and hosted 2 feasts to celebrate collective efforts. Join us in making a difference!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md impact-card opacity-0 translate-y-10">
              <h3 className="text-xl font-semibold text-blue-800">50+</h3>
              <p className="text-gray-600">Community Members Empowered</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md impact-card opacity-0 translate-y-10">
              <h3 className="text-xl font-semibold text-blue-800">2+</h3>
              <p className="text-gray-600">Local Projects</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md impact-card opacity-0 translate-y-10">
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
          <DonateButton isOpen={isDonateOpen} setIsOpen={setIsDonateOpen} />
          <Link href="/contact">
            <button className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}