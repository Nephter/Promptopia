'use client'

import { useState } from 'react';
import Messages from './messages';
import { useRouter } from 'next/navigation';
import { supabase } from 'src/lib/supabase';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  async function signInWithEmail(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/success')
    }
  }

  const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    await supabase
      .from('Users')
      .insert([
        { email }
      ]);

    if (error) {
      setError(error.message);
    } else {
      router.push('/success')
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmail(formData.email, formData.password);
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
          onChange={handleChange}
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-700 rounded px-4 py-2 text-white mb-2"
        >
          Sign In
        </button>
        <button
          type="button"
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
          onClick={() => signUpWithEmail(formData.email, formData.password)}
        >
          Sign Up
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <Messages />
      </form>
    </div>
  );
}
