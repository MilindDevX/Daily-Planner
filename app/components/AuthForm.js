"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../app/context/AuthContext"; // Make sure path is correct

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { login, signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative w-full">
      {error && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center z-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded text-center shadow-md max-w-md w-full">
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto space-y-4 bg-white p-8 rounded shadow">
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <button
          type="button"
          className="w-full text-sm underline mt-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
        </button>

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <button
          type="button"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
