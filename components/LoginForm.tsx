import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';
import AlertIcon from './icons/AlertIcon';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    // --- IMPORTANT: Connecting to SQL Server ---
    // A frontend application in the browser CANNOT connect directly to a
    // SQL Server database. This is for security and technical reasons.
    // The correct approach is to send the login details to a backend API.
    // That backend API (e.g., built with Node.js, C#, or Python) will then
    // securely connect to your 'localhost\SQLEXPRESS' server, query the
    // 'test' database, and check the 'tbl_Users' table for the matching
    // username and password columns.

    // --- Simulating Backend API Call for Demonstration ---
    console.log('Sending credentials to backend:', { username, password });
    setTimeout(() => {
      // Your backend would perform this check:
      // For this demo, we'll use a hardcoded user.
      if (username === 'admin' && password === 'password123') {
        console.log('Backend confirmed credentials. Logging in.');
        onLoginSuccess(); // This updates the UI to show the dashboard
      } else {
        // Failed login simulation
        setError('Invalid username or password.');
      }
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="z-10 w-full max-w-md p-8 space-y-8 bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-100 tracking-wider">LOGIN</h1>
        <p className="mt-2 text-sm text-gray-400">Enter your credentials to access your account</p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Username Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <UserIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full py-3 pl-10 pr-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Username"
            required
            autoComplete="username"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LockIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full py-3 pl-10 pr-10 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center justify-center p-2 space-x-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400" role="alert">
            <AlertIcon className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
            <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot your password?
                </a>
            </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
            <span className="relative flex items-center justify-center h-5">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                  Login
                  <ArrowRightIcon className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
      
      <div className="text-sm text-center text-gray-400">
        Don't have an account?{' '}
        <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
