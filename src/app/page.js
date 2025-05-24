import Image from 'next/image';
import DonateButton from '../components/DonateButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image and Description */}
      <section className="relative">
        <Image
          src="/hero-image.jpg"
          alt="Tule Initiative Hero Image"
          width={1200}
          height={600}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-blue-700 bg-opacity-75 flex items-center justify-center text-center p-4 pt-16">
          <div>
            <h1 className="text-4xl font-bold text-yellow-300 mb-4">Welcome to Tule Initiative</h1>
            <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
              Tule, meaning "let's eat" in Swahili, unites communities through talent and purpose. [Add your description here.]
            </p>
            <DonateButton />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Tule brings together people from diverse backgrounds to nurture their God-given talents,
            fostering unity and addressing social challenges through community-driven projects.
          </p>
        </div>
        <div className="md:w-1/2 p-4">
          <Image
            src="/mission-photo.png"
            alt="Mission Photo"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}