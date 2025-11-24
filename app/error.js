'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { XCircle, RefreshCw } from 'lucide-react'; // Example of using an icon library

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* Error Card Container */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
        <div className="flex flex-col items-center">
          <XCircle className="w-16 h-16 text-red-500 mb-4" /> {/* Error Icon */}
          <h2 className="text-2xl font-bold mb-3">Something went wrong!</h2>
          
          {/* Detailed Error Message (visible in dev mode, generic in prod by default) */}
          <p className="text-gray-400 text-center mb-6">
            An unexpected error occurred. Please try again or contact support if the problem persists.
          </p>
          
          <button
            onClick={() => window.location.reload()} // The 'reset' function attempts to re-render the boundary
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
