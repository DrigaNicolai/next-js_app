"use client"

import { useUserRole } from "@middleware/useUserRole";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { useSession } from "next-auth/react";
import CustomSession from "@ts/interface/customAuth";
import { useEffect, useState } from "react";
import { IWarning } from "@ts/interface/warning";
import { IHeaders } from "@ts/interface/global";
import { getTableHeaders } from "@static/getTableHeaders";
import DataTable from "@components/DataTable";

const Warnings = () => {
  const user = useUserRole(["admin", "moderator"]) as string;
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession() as unknown as CustomSession;
  const [warnings, setWarnings] = useState([] as Array<IWarning>);
  const [headers, setHeaders] = useState([] as Array<IHeaders>);

  useEffect(() => {
    const fetchWarnings = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/warnings`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        const data = await response.json();

        const parsedData = data.map((item) => (
          {
            _id: item._id,
            moderator_name: item.moderator_id.username,
            intruder_name: item.intruder_id.username,
            warning_type_name: item.warning_type_id.name,
            comment: item.comment
          }
        ));

        setWarnings(parsedData);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchHeaders = (): void => {
      const response = getTableHeaders("warnings");

      setHeaders(response);
    }

    if (!user) {
      router.replace("/");
    }

    fetchWarnings();
    fetchHeaders();
  }, []);

  const handleEdit = (id: string): void => {
    router.push(`/warnings/${id}/edit`);
  }

  const handleDelete = async (warning: IWarning): Promise<void> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this warning?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/warnings/${String(warning._id)}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        if (response.ok) {
          const filteredWarnings = warnings.filter((item) => item._id !== warning._id);

          setWarnings(filteredWarnings);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Warnings table</span>
      </h1>
      {!warnings.length ? (
        <p className="desc text-left">There are no warnings</p>
      ) : (
        <DataTable
          data={warnings}
          headers={headers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Warnings;
