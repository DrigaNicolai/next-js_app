"use client"

import { useUserRole } from "@middleware/useUserRole";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { useSession } from "next-auth/react";
import CustomSession from "@ts/interface/customAuth";
import { useEffect, useState } from "react";
import { ITag } from "@ts/interface/tag";
import { IHeaders } from "@ts/interface/global";
import { getTableHeaders } from "@static/getTableHeaders";
import DataTable from "@components/DataTable";
import Link from "next/link";

const Tags = () => {
  const user = useUserRole(["admin", "moderator", "user"]) as string;
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession() as unknown as CustomSession;
  const [tags, setTags] = useState([] as Array<ITag>);
  const [headers, setHeaders] = useState([] as Array<IHeaders>)

  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/tags`, {
          method: "GET"
        });

        const data = await response.json();

        setTags(data);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchHeaders = (): void => {
      const response = getTableHeaders("tags");

      setHeaders(response);
    }

    fetchTags();
    fetchHeaders();
  }, []);

  const handleEdit = (id: string): void => {
    router.push(`/tags/${id}/edit`);
  }

  const handleDelete = async (tag: ITag): Promise<void> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this tag?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/tags/${tag._id.toString()}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        if (response.ok) {
          const filteredTags = tags.filter((item) => item._id !== tag._id);

          setTags(filteredTags);
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
          Tag
        </span>
      </h1>
      {user ? ( user !== "user" ? (
        <>
          <Link href="/tags/create" className="black_btn mt-4">
            Create tag
          </Link>
          <Link href="/tag-applications" className="black_btn mt-4">
            Tag applications
          </Link>
        </>
      ) : (
        <Link href="/tag-applications/create" className="black_btn mt-4">
          Send tag application
        </Link>
      )) : (
        <></>
      )}
      {!tags.length ? (
        <p className="desc text-left">There are no tags</p>
      ) : (user !== "user" && session ? (
          <DataTable
            data={tags}
            headers={headers}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <DataTable
            data={tags}
            headers={headers}
          />
        )
      )}
    </div>
  );
};

export default Tags;
