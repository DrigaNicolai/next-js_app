"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IPrompt } from "@ts/interface/prompt";
import { ITag } from "@ts/interface/tag";
import { useSession } from "@node_modules/next-auth/react";
import CustomSession from "@ts/interface/customAuth";

const EditPrompt = () => {
  const router = useRouter() as AppRouterInstance;
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [post, setPost] = useState({} as IPrompt | any);
  const [tags, setTags] = useState([] as Array<ITag>);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompts/${promptId}`);
      const data = await response.json() as IPrompt;

      setPost({
        title: data.title,
        text: data.text,
        tag_id: data.tag_id
      });
    }

    const fetchTags = async (): Promise<any> => {
      const response = await fetch(`/api/tags`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const data = await response.json() as Array<ITag>;

      setTags(data);
    }

    if (promptId) {
      getPromptDetails();
      fetchTags();
    }
  }, [promptId])

  const updatePrompt = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return alert("Missing PromptId!");
    }

    try {
      const response = await fetch(`/api/prompts/${promptId}`,{
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          text: post.text,
          tag_id: post.tag_id
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
      type="Edit"
      post={post}
      tags={tags}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
