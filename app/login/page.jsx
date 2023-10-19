'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from 'src/lib/supabase';
import Messages from './messages';
import { v4 as uuidv4 } from 'uuid'

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showAccordion, setShowAccordion] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

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

  const signUpWithEmail = async (email, password, username, image) => {
    const id = uuidv4();

    try {
      // Upload the avatar image to Supabase storage
      await supabase.storage.from('promptopiaAvatars').upload(`${id}`, image);

      // Sign up the user with email and password
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return; // Exit early if there's an error
      }

      const { data: userData, insertError } = await supabase
        .from('Users')
        .insert([
          {
            email,
            username,
            userId: id,
          },
        ]);

      if (insertError) {
        setError(insertError.message);
      } else {
        // User signed up successfully and data inserted into "Users" table
        router.push('/success');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError(error.message);
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

  function handleSignUpClick() {
    if (showAccordion) {
      signUpWithEmail(formData.email, formData.password, formData.username, imageFile);
    } else {
      setShowAccordion(!showAccordion);
    }
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

        {showAccordion && (
          <>
            <label className="text-md" htmlFor="username">
              Username
            </label>

            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="username"
              placeholder="Your username"
              onChange={handleChange}
            />

            <label className="text-md" htmlFor="image">
              Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="image"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </>
        )}

        {!showAccordion &&
          <button
            type="submit"
            className="bg-green-700 rounded px-4 py-2 text-white mb-2"
          >
            Sign In
          </button>}

        <button
          type="button"
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
          onClick={handleSignUpClick}
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
