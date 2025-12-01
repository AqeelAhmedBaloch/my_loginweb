import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SunIcon from './components/icons/SunIcon';
import MoonIcon from './components/icons/MoonIcon';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center font-sans overflow-hidden bg-gray-100 dark:bg-[#0d1117] transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-black/10 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-black/20 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-purple-500 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Custom Tailwind CSS for animations. Required because CDN does not support animation config. */}
      <style>
        {`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>

      {isAuthenticated ? <Dashboard /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
    </main>
  );
};

export default App;