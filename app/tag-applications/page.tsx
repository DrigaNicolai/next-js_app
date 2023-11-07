"use client";

import { useUserRole } from "@middleware/useUserRole";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { useSession } from "next-auth/react";
import CustomSession from "@ts/interface/customAuth";
import { useEffect, useState } from "react";
import { ITagApplication } from "@ts/interface/tagApplication";
import { IHeaders } from "@ts/interface/global";
import { getTableHeaders } from "@static/getTableHeaders";
import DataTable from "@components/DataTable";
import Link from "next/link";
import {ITag} from "@ts/interface/tag";
import {it} from "node:test";
import {IUser} from "@ts/interface/user";

const TagApplications = () => {
  const user = useUserRole(["admin", "moderator"]) as string;
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession() as unknown as CustomSession;
  const [tagApplications, setTagApplications] = useState([] as Array<ITag>);
  const [headers, setHeaders] = useState([] as Array<IHeaders>);

  useEffect(() => {
    const fetchTagApplications = async (): Promise<void> => {
      const response = await fetch(`/api/tag-applications`, {
        method: "GET"
      });

      const data = await response.json();

      const parsedData = data.map((item) => (
        { _id: item._id, username: item.applicant_id.username, tag_name: item.name, description: item.description }
      ));

      setTagApplications(parsedData);
    }

    const fetchHeaders = (): void => {
      const response = getTableHeaders("tagApplications");

      setHeaders(response);
    }

    if (!user) {
      router.replace("/");
    }

    fetchTagApplications();
    fetchHeaders();
  }, []);

  const handleApprove = async (item: ITagApplication | any): Promise<void> => {
    try {
      const response = await fetch("/api/tags/create/application", {
        method: "POST",
        body: JSON.stringify({
          application_id: item._id,
          name: item.tag_name,
          description: item.description
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
    }
  }

  const handleDelete = async (tagApplication: ITagApplication): Promise<void> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this tag application?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/tag-applications/${tagApplication._id.toString()}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        if (response.ok) {
          const filteredTagApplications = tagApplications
            .filter((item: ITagApplication) => item._id !== tagApplication._id);

          setTagApplications(filteredTagApplications);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className="blue_gradient">Tag applications</span>
      </h1>
      {!tagApplications.length ? (
        <p className="desc text-left">There are no tag applications</p>
      ) : (
        <DataTable
          data={tagApplications}
          headers={headers}
          handleApprove={handleApprove}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default TagApplications;
