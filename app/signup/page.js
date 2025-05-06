"use client";
import { useState } from "react";
import supabase from "../../utils/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setMessage("Check your email for a confirmation link.");
  }

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input
        className="w-full border rounded px-3 py-2"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border rounded px-3 py-2"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
        Sign Up
      </button>
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <p className="mt-4 text-center text-sm">
        Already have an account? <a href="/login" className="text-blue-600 underline">Log in</a>
      </p>
    </form>
  );
}
