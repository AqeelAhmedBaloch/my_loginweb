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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isPasswordTooltipVisible, setIsPasswordTooltipVisible] = useState(false);


  const checkPasswordStrength = (pass: string) => {
    if (!pass) {
      setPasswordStrength('');
      return;
    }
  
    const hasLetters = /[a-zA-Z]/.test(pass);
    const hasNumbers = /[0-9]/.test(pass);
    const hasSymbols = /[^a-zA-Z0-9]/.test(pass);
  
    if (pass.length < 8) {
      setPasswordStrength('Weak');
    } else if (hasLetters && hasNumbers && hasSymbols) {
      setPasswordStrength('Strong');
    } else if ((hasLetters && hasNumbers) || (hasLetters && hasSymbols) || (hasNumbers && hasSymbols)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak'); // Long but not complex
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'Weak': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Strong': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
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
        <h1 className="text-4xl font-bold text-gray-100 tracking-wider">CREATE ACCOUNT</h1>
        <p className="mt-2 text-sm text-gray-400">Create a new account to get started</p>
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
        <div 
          className="relative"
          onMouseEnter={() => setIsPasswordTooltipVisible(true)}
          onMouseLeave={() => setIsPasswordTooltipVisible(false)}
        >
          {isPasswordTooltipVisible && passwordStrength && (
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 text-xs font-semibold rounded-md shadow-lg bg-gray-900 border border-gray-700 ${getStrengthColor()} transition-opacity duration-300 z-20`}>
                Password Strength: {passwordStrength}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-700"></div>
            </div>
          )}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LockIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="block w-full py-3 pl-10 pr-10 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Password"
            required
            autoComplete="new-password"
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
        
        {/* Confirm Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LockIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full py-3 pl-10 pr-10 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Confirm Password"
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300 transition-colors"
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
          >
            {showConfirmPassword ? (
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
                  Sign Up
                  <ArrowRightIcon className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
      
      <div className="text-sm text-center">
        <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;