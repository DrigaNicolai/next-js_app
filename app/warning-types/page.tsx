"use client";

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
// import { useUserRole } from "@middleware/useUserRole";

const Page = () => {
  // const user = useUserRole(["admin", "moderator", "user"]) as string;
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

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          Warning Types table
        </span>
      </h1>
      <Link href="/warning-types/create" className="black_btn mt-2">
        Create warning type
      </Link>
      {!warningTypes.length ? (
        <p className="desc text-left">There are no warning types</p>
      ) : (
        <DataTable
          data={warningTypes}
          headers={headers}
        />
      )}

      { JSON.stringify(headers) }
      { JSON.stringify(warningTypes) }
    </div>
  );
};

export default Page;
