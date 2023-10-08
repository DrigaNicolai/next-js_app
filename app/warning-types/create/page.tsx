"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";

import WarningTypeForm from "@components/form/WarningTypeForm";
import CustomSession from "@ts/interface/customAuth";
import { IWarningType } from "@ts/interface/warningType";


const CreateWarningType = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [warningType, setWarningType] = useState({
    name: "",
    points_number: 0
  } as IWarningType)

  const createWarningType = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/warning-types/create", {
        method: "POST",
        body: JSON.stringify(warningType),
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      if (response.ok) {
        router.push("/warning-types");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <WarningTypeForm
      type="Create"
      warningType={warningType}
      setWarningType={setWarningType}
      submitting={submitting}
      handleSubmit={createWarningType}
    />
  );
};

export default CreateWarningType;
