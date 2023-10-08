"use client";

import { useUserRole } from "@middleware/useUserRole";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DataTable from "@components/DataTable";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IUser } from "@ts/interface/user";
import CustomSession from "@ts/interface/customAuth";
import { getTableHeaders } from "@static/getTableHeaders";
import { IHeaders } from "@ts/interface/global";

const Users = () => {
  const user = useUserRole(["admin"]) as string;
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;
  const [users, setUsers] = useState([] as Array<IUser>);
  const [headers, setHeaders] = useState([] as Array<IHeaders>);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      const response = await fetch(`/api/users`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const data = await response.json();

      const parsedData = data.map((item) => (
        { _id: item._id, email: item.email, username: item.username, role: item.role_id.name }
      ));

      setUsers(parsedData);
    }

    const fetchHeaders = (): void => {
      const response = getTableHeaders("users");

      // const parsedHeaders = [...response, { text: "Actions", value: "actions", }];

      setHeaders(response);
    }

    if (!user) {
      router.replace("/");
    }

    fetchUsers();
    fetchHeaders();
  }, [user]);

  const handleEdit = (id: string): void => {
    router.push(`/users/${id}/edit`);
  }

  const handleDelete = async (user: IUser): Promise<void> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this user?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/users/${user._id.toString()}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        if (response.ok) {
          const filteredUsers = users.filter((item) => item.id !== user._id);

          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className="blue_gradient">Users table</span>
      </h1>
      {!users.length ? (
        <p className="desc text-left">There are no users</p>
      ) : (
        <DataTable
          data={users}
          headers={headers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Users;
