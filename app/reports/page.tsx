"use client";

import { useUserRole } from "@middleware/useUserRole";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CustomSession from "@ts/interface/customAuth";
import { useEffect, useState } from "react";
import { IReport } from "@ts/interface/report";
import { IHeaders } from "@ts/interface/global";
import { getTableHeaders } from "@static/getTableHeaders";
import DataTable from "@components/DataTable";

const Reports = () => {
  const user = useUserRole(["admin", "moderator"]) as string;
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession() as unknown as CustomSession;
  const [reports, setReports] = useState([] as Array<IReport>);
  const [headers, setHeaders] = useState([] as Array<IHeaders>);

  useEffect(() => {
    const fetchReports = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/reports`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        const data = await response.json();

        const parsedData = data.map((item) => (
          {
            _id: item._id,
            victim_name: item.victim_id.username,
            message: item.message,
            post_title: item.prompt_id.title,
            post_text: item.prompt_id.text,
            post_tag: item.prompt_id.tag_id.name
          }
        ));

        setReports(parsedData);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchHeaders = (): void => {
      const response = getTableHeaders("reports");

      setHeaders(response);
    }

    if (!user) {
      router.replace("/");
    }

    fetchReports();
    fetchHeaders();
  }, []);

  const handleApprove = (item: IReport): void => {
    router.push(`/warnings/create?report_id=${item._id}`);
  }

  const handleDelete = async (report: IReport): Promise<any> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this report?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/reports/${String(report._id)}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        if (response.ok) {
          const filteredReports = reports.filter((item) => item._id !== report._id);

          setReports(filteredReports);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Reports table</span>
      </h1>
      {!reports.length ? (
        <p className="desc text-left">There are no reports</p>
      ) : (
        <DataTable
          data={reports}
          headers={headers}
          handleApprove={handleApprove}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Reports;
