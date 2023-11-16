"use client";

import React, {useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import WarningForm from "@components/form/WarningForm";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import CustomSession from "@ts/interface/customAuth";
import { IUser } from "@ts/interface/user";
import { IWarningType } from "@ts/interface/warningType";
import { useUserRole } from "@middleware/useUserRole";
import { IWarning } from "@ts/interface/warning";

const CreateWarning = () => {
  const user = useUserRole(["admin", "moderator"]) as string;
  const router = useRouter() as AppRouterInstance;
  const searchParams = useSearchParams();
  const { data: session } = useSession() as unknown as CustomSession;

  const reportId = searchParams.get("report_id");
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
      const response = await fetch(`/api/users`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const data = await response.json();

      setUsers(data);
    }

    const fetchWarningTypes = async (): Promise<any> => {
      const response = await fetch(`/api/warning-types`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const data = await response.json();

      setWarningTypes(data);
    }

    const fetchReport = async(): Promise<any> => {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const data = await response.json();

      setWarning({ ...warning, intruder_id: data.prompt_id.createdBy });
      setReportData(`${data.prompt_id.title}`);
    }

    if (!user) {
      router.replace("/");
    }

    fetchUsers();
    fetchWarningTypes();
    fetchReport();
  }, []);

  const createWarning = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const createResponse = await fetch("/api/warnings/create",{
        method: "POST",
        body: JSON.stringify({
          moderator_id: session?.user.id,
          intruder_id: warning.intruder_id,
          warning_type_id: warning.warning_type_id,
          comment: warning.comment
        }),
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      if (createResponse.ok) {
        const deleteResponse = await fetch(`/api/reports/${reportId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        if (deleteResponse.ok) {
          router.push("/reports");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <WarningForm
      type="Create"
      warning={warning}
      warningTypes={warningTypes}
      users={users}
      reportData={reportData}
      setWarning={setWarning}
      submitting={submitting}
      handleSubmit={createWarning}
    />
  )
}

export default CreateWarning;
