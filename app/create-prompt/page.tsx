"use client";

import React, {useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PostForm from "@components/form/PostForm";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IPrompt } from "@ts/interface/prompt";
import CustomSession from "@ts/interface/customAuth";
import { ITag } from "@ts/interface/tag";

const CreatePrompt = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [post, setPost] = useState({
    title: "",
    text: "",
    tag_id: "default"
  } as IPrompt);
  const [tags, setTags] = useState([] as Array<ITag>);

  useEffect(() => {
    const fetchTags = async (): Promise<any> => {
      try {
        const response = await fetch(`/api/tags`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        const data = await response.json();

        setTags(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTags();
  }, []);

  const createPost = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/posts/create",{
        method: "POST",
        body: JSON.stringify({
          createdBy: session?.user.id,
          title: post.title,
          text: post.text,
          tag_id: post.tag_id
        }),
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
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
    <PostForm
      type="Create"
      post={post}
      tags={tags}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
