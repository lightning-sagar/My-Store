import React from 'react';

function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-rose-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
}

export default LoadingPage;
