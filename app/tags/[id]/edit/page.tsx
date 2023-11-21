"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { ITag } from "@ts/interface/tag";
import { useSession } from "next-auth/react";
import { useUserRole } from "@middleware/useUserRole";
import CustomSession from "@ts/interface/customAuth";
import TagForm from "@components/form/TagForm";

interface ITagEdit {
  params: {
    id: string;
  }
}

const EditTag = ({ params }: ITagEdit) => {
  const user: string = useUserRole(["admin", "moderator"]);
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [tag, setTag] = useState({
    name: "",
    description: ""
  } as ITag);

  useEffect(() => {
    const getTagDetails = async (): Promise<any> => {
      try {
        const response = await fetch(`/api/tags/${params.id}`);
        const data = await response.json();

        setTag({
          name: data.name,
          description: data.description
        });
      } catch (error) {
        console.log(error);
      }
    }

    if(!user) {
      router.replace("/tags");
    }

    if (params.id) {
      getTagDetails();
    }
   }, [params.id, user]);

  const updateTag = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    if (!params.id) {
      return alert("Missing tag id!");
    }

    try {
      const response = await fetch(`/api/tags/${params.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
          name: tag.name,
          description: tag.description
        })
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
      type="Edit"
      tag={tag}
      setTag={setTag}
      submitting={submitting}
      handleSubmit={updateTag}
    />
  );
};

export default EditTag;
