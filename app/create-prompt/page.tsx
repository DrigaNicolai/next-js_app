"use client";

import React, { useState } from 'react';
import {Session, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import {IPrompt} from "@ts/interface/prompt";

const CreatePrompt = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as Session;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [post, setPost] = useState({} as any);

  const createPrompt = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompts/new",{
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
