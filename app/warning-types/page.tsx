"use client";

import { useUserRole } from "@middleware/useUserRole";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { useSession } from "next-auth/react";
import CustomSession from "@ts/interface/customAuth";
import {useEffect, useState} from "react";
import { IWarningType } from "@ts/interface/warningType";
import { IHeaders } from "@ts/interface/global";
import { getTableHeaders } from "@static/getTableHeaders";
import DataTable from "@components/DataTable";
import Link from "next/link";

const Page = () => {
  const user = useUserRole(["admin", "moderator", "user"]) as string;
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession() as unknown as CustomSession
  const [warningTypes, setWarningTypes] = useState([] as Array<IWarningType>);
  const [headers, setHeaders] = useState([] as Array<IHeaders>);

  useEffect(() => {
    const fetchWarningTypes = async (): Promise<void> => {
      const response = await fetch(`/api/warning-types`, {
        method: "GET"
      });

      const data = await response.json();

      setWarningTypes(data);
    }

    const fetchHeaders = (): void => {
      const response = getTableHeaders("warningTypes");

      setHeaders(response);
    }

    fetchWarningTypes();
    fetchHeaders();
  }, []);

  const handleEdit = (id: string): void => {
    router.push(`/warning-types/${id}/edit`);
  }

  const handleDelete = async (warningType: IWarningType): Promise<void> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this warning type?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/warning-types/${warningType._id.toString()}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        if (response.ok) {
          const filteredWarningTypes = warningTypes.filter((item) => item._id !== warningType._id);

          setWarningTypes(filteredWarningTypes);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          Warning Types table
        </span>
      </h1>
      {user === "admin" ? (
        <Link href="/warning-types/create" className="black_btn mt-4">
          Create warning type
        </Link>
      ) : (
        <></>
      )}

      {!warningTypes.length ? (
        <p className="desc text-left">There are no warning types</p>
      ) : (user === "admin" ? (
          <DataTable
            data={warningTypes}
            headers={headers}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <DataTable
            data={warningTypes}
            headers={headers}
          />
        )
      )}
    </div>
  );
};

export default Page;
