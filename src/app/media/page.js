// File: src/app/media/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Media() {
  // Step 1: Create state variables to store photos, the current slide, and loading status
  const [photos, setPhotos] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  // Step 2: Use useEffect to set up the photo list when the page loads
  useEffect(() => {
    // This is our predefined list of photos (like a shopping list of image names)
    const predefinedPhotos = [
      '/media/photos/photo1.jpeg',
      '/media/photos/photo2.jpg',
      '/media/photos/photo3.png',
      '/media/photos/photo4.png',
      '/media/photos/photo5.png',
      '/media/photos/photo6.jpg',
      '/media/photos/photo7.png',
    ];

    // Set the photos from our list and stop the loading message
    setPhotos(predefinedPhotos);
    setLoading(false);
  }, []); // The empty array [] means this runs only once when the page loads

  // Step 3: Functions to move to the next or previous slide
  const handleNextSlide = () => {
    // Move to the next slide, and if we're at the end, go back to the start
    setCurrentSlideIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevSlide = () => {
    // Move to the previous slide, and if we're at the start, go to the end
    setCurrentSlideIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Step 4: Automatically change slides every 5 seconds
  useEffect(() => {
    // Set up a timer to change slides
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % photos.length);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the timer when we leave the page
    return () => clearInterval(interval);
  }, [photos.length]); // This runs when the number of photos changes

  // Step 5: Add a pop-up effect when the section appears
  useEffect(() => {
    // Create an observer to watch when the section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        // When the section is visible
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the image and add the pop-up animation if it doesn't have it
            const img = entry.target.querySelector('img');
            if (img && !img.classList.contains('animate-pop-up')) {
              img.classList.add('animate-pop-up');
            }
            // Stop watching after it pops up
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Start watching the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up the observer when we leave the page
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Step 6: Show a loading message while photos are being set
  if (loading) return <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-8" role="status" aria-live="polite">Loading...</div>;

  // Step 7: Build the page layout
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-8 pt-20" style={{ paddingTop: '80px' }}>
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Media Gallery</h1>

      {/* Step 8: Show the slideshow if there are photos */}
      {photos.length > 0 ? (
        <section ref={sectionRef} className="mb-12">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">View the Joy and Smiles we've Captured over the years</h2>
          <div className="relative">
            <div className="relative w-full min-h-[400px]">
              <Image
                src={photos[currentSlideIndex]}
                alt={`Slide ${currentSlideIndex + 1}`}
                layout="fill"
                objectFit="contain" // Changed from 'cover' to 'contain' to avoid cropping
                className="rounded-lg shadow-md transition-opacity duration-500"
              />
            </div>
            <button
              onClick={handlePrevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              aria-label="Previous Slide"
            >
              ❮
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              aria-label="Next Slide"
            >
              ❯
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlideIndex ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setCurrentSlideIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p className="text-gray-700">No photos available at the moment.</p>
      )}
    </main>
  );
}