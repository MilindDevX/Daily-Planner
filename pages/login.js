import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../app/context/AuthContext';
import Link from 'next/link';

const AuthPage = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!isLogin && password !== confirmPassword) {
        return setError('Passwords do not match.');
      }
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      router.push('/home');
    } catch (err) {
      setError(err.message || 'Authentication failed. Try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      router.push('/home');
    } catch (err) {
      setError('Google login failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isLogin ? 'Login to Daily Planner' : 'Create an Account'}
        </h1>

        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
