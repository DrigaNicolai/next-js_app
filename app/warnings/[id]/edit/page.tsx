"use client";

import React, {useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import WarningForm from "@components/form/WarningForm";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import CustomSession from "@ts/interface/customAuth";
import { IUser } from "@ts/interface/user";
import { IWarningType } from "@ts/interface/warningType";
import { useUserRole } from "@middleware/useUserRole";
import { IWarning } from "@ts/interface/warning";

interface IWarningEdit {
  params: {
    id: string;
  }
}

const EditWarning = ({ params }: IWarningEdit) => {
  const user = useUserRole(["admin"]) as string;
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [users, setUsers] = useState([] as Array<IUser>);
  const [warningTypes, setWarningTypes] = useState([] as Array<IWarningType>);
  const [warning, setWarning] = useState({
    moderator_id: "",
    intruder_id: "",
    warning_type_id: "default",
    comment: ""
  } as IWarning);
  const [reportData, setReportData] = useState("" as string);

  useEffect(() => {
    const fetchUsers = async (): Promise<any> => {
      try {
        const response = await fetch(`/api/users`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchWarningTypes = async (): Promise<any> => {
      try {
        const response = await fetch(`/api/warning-types`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        const data = await response.json();

        setWarningTypes(data);
      } catch (error) {
        console.log(error);
      }
    }

    const getWarningDetails = async (): Promise<any> => {
      try {
        const response = await fetch(`/api/warnings/${params.id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });
        const data = await response.json();

        setWarning({
          intruder_id: data.intruder_id,
          warning_type_id: data.warning_type_id,
          comment: data.comment
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (!user) {
      router.replace("/warnings");
    }

    if (params.id) {
      fetchUsers();
      fetchWarningTypes();
      getWarningDetails();
    }
  }, [params.id, user]);

  const editWarning = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    if (!params.id) {
      return alert("Missing warning id!");
    }

    try {
      const response = await fetch(`/api/warnings/${params.id}`,{
        method: "PATCH",
        body: JSON.stringify({
          warning_type_id: warning.warning_type_id,
          comment: warning.comment
        }),
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      if (response.ok) {
        router.push("/warnings");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <WarningForm
      type="Edit"
      warning={warning}
      warningTypes={warningTypes}
      users={users}
      reportData={reportData}
      setWarning={setWarning}
      submitting={submitting}
      handleSubmit={editWarning}
    />
  )
}

export default EditWarning;
