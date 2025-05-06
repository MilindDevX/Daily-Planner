"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../utils/supabaseClient";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard");
    }
  }

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
      </form>
    </div>
  );
}
