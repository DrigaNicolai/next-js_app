"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import PostForm from "@components/form/PostForm";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IPrompt } from "@ts/interface/prompt";
import { ITag } from "@ts/interface/tag";
import { useSession } from "@node_modules/next-auth/react";
import CustomSession from "@ts/interface/customAuth";
import { useUserRole } from "@middleware/useUserRole";

const EditPrompt = () => {
  const user: string = useUserRole(["admin", "moderator", "user"]);
  const router = useRouter() as AppRouterInstance;
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [tags, setTags] = useState([] as Array<ITag>);
  const [post, setPost] = useState({
    title: "",
    text: "",
    tag_id: ""
  } as IPrompt | any);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json() as IPrompt;

      setPost({
        title: data.title,
        text: data.text,
        tag_id: data.tag_id
      });

      if (session?.user.id !== String(data.createdBy)) {
        router.replace("/");
      }
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

    if(!user) {
      router.replace("/");
    }

    if (postId) {
      fetchTags();
      getPostDetails();
    }

  }, [postId, user])

  const updatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) {
      return alert("Missing PostID!");
    }

    try {
      const response = await fetch(`/api/posts/${postId}`,{
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          text: post.text,
          tag_id: post.tag_id
        }),
        headers: {
          "Authorization": `Bearer ${session?.token}`
        },
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PostForm
      type="Edit"
      post={post}
      tags={tags}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default EditPrompt;
