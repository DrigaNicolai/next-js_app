"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IWarningType } from "@ts/interface/warningType";
import { useSession } from "next-auth/react";
import { useUserRole } from "@middleware/useUserRole";
import CustomSession from "@ts/interface/customAuth";
import WarningTypeForm from "@components/form/WarningTypeForm";

interface IWarningTypeEdit {
  params: {
    id: string
  }
}

const EditWarningType = ({ params }: IWarningTypeEdit) => {
  const user: string = useUserRole(["admin"]);
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [warningTypeData, setWarningTypeData] = useState({
    name: "",
    points_number: 0
  } as IWarningType);

  useEffect(() => {
    const getWarningTypeDetails = async (): Promise<any> => {
      try {
        const response = await fetch(`/api/warning-types/${params.id}`);
        const data = await response.json();

        setWarningTypeData({
          name: data.name,
          points_number: data.points_number
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (!user) {
      router.replace("/warning-type");
    }

    if (params.id) {
      getWarningTypeDetails();
    }
  }, [params.id, user]);

  const updateWarningType = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    if (!params.id) {
      return alert("Missing warning type id!");
    }

    try {
      const response = await fetch(`/api/warning-types/${params.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
          name: warningTypeData.name,
          points_number: warningTypeData.points_number
        })
      });

      if (response.ok) {
        router.push("/warning-types")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <WarningTypeForm
      type="Edit"
      warningType={warningTypeData}
      setWarningType={setWarningTypeData}
      submitting={submitting}
      handleSubmit={updateWarningType}
    />
  );
};

export default EditWarningType;
