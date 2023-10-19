'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "src/lib/supabase";
import Form from "src/components/Form";
import axios from 'axios'

const CreatePrompt = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();

    const { data: { session } } = await supabase.auth.getSession()

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        '/api/prompt/new',
        JSON.stringify({
          userId: session?.user?.id,
          prompt: post.prompt,
          tag: post.tag
        }));

      if (response.status === 201) {
        setIsSubmitting(false);
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
