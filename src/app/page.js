export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Hero Section */}
      <section className="bg-blue-700 text-yellow-300 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Tule Initiative</h1>
        <p className="text-lg mb-6">
          Tule, meaning "let's eat" in Swahili, unites communities through talent and purpose.
        </p>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
          Donate Now
        </button>
      </section>
      {/* Overview Section */}
      <section className="p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Tule brings together people from diverse backgrounds to nurture their God-given talents,
          fostering unity and addressing social challenges through community-driven projects.
        </p>
      </section>
    </div>
  );
}