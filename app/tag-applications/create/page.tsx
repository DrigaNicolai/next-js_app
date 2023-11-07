"use client";

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";

import TagApplicationForm from "@components/form/TagApplication";
import CustomSession from "@ts/interface/customAuth";
import { ITagApplication } from "@ts/interface/tagApplication";

const CreateTagApplication = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [tagApplication, setTagApplication] = useState({
    name: "",
    description: ""
  } as ITagApplication);

  const createTagApplication = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/tag-applications/create", {
        method: "POST",
        body: JSON.stringify({
          ...tagApplication,
          applicant_id: session?.user.id
        }),
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
    <TagApplicationForm
      type="Create"
      tagApplication={tagApplication}
      setTagApplication={setTagApplication}
      submitting={submitting}
      handleSubmit={createTagApplication}
    />
  );
};

export default CreateTagApplication;
