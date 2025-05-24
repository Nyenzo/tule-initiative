'use client';

import { useState } from 'react';

export default function DonateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Donate
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-yellow-50 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Support Tule Initiative</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">Donate via M-Pesa</h3>
                <p className="text-gray-700">[Placeholder: M-Pesa payment details will be integrated here.]</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700">Donate via Bank Transfer</h3>
                <p className="text-gray-700">[Placeholder: Bank transfer details will be integrated here.]</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}