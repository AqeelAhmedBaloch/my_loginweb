
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="z-10 w-full max-w-md p-8 text-center bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/20">
      <h1 className="text-4xl font-bold text-gray-100 tracking-wider">Welcome to the Dashboard</h1>
      <p className="mt-2 text-lg text-gray-400">Authentication successful!</p>
    </div>
  );
};

export default Dashboard;
