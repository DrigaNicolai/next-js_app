"use client"

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";

import TagForm from "@components/form/TagForm";
import CustomSession from "@ts/interface/customAuth";
import { ITag } from "@ts/interface/tag";

const CreateTag = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [tag, setTag] = useState({
    name: "",
    description: ""
  } as ITag);

  const createTag = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/tags/create", {
        method: "POST",
        body: JSON.stringify(tag),
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      if (response.ok) {
        router.push("/tags");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <TagForm
      type="Create"
      tag={tag}
      setTag={setTag}
      submitting={submitting}
      handleSubmit={createTag}
    />
  );
};

export default CreateTag;
