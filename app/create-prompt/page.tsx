"use client";

import React, {useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IPrompt } from "@ts/interface/prompt";
import CustomSession from "@ts/interface/customAuth";
import { ITag } from "@ts/interface/tag";

const CreatePrompt = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [post, setPost] = useState({} as IPrompt);
  const [tags, setTags] = useState([] as Array<ITag>);

  useEffect(() => {
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

    fetchTags();
  }, []);

  const createPrompt = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompts/new",{
        method: "POST",
        body: JSON.stringify({
          createdBy: session?.user.id,
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
      type="Create"
      post={post}
      tags={tags}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
