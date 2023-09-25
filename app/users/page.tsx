"use client";

import { useUserRole } from "@middleware/useUserRole";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DataTable from "@components/DataTable";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IUser } from "@ts/interface/user";
import CustomSession from "@ts/interface/customAuth";
import {getTableHeaders} from "@static/getTableHeaders";
import {IHeaders} from "@ts/interface/global";

const Users = () => {
  const user = useUserRole(["admin", "user"]) as string; // TODO: Remove user
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
        { id: item._id, email: item.email, username: item.username, role: item.role_id.name }
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

  const test = (): void => {
    console.log("test")
  }

  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className="blue_gradient">Users table</span>
      </h1>
      {/*<div className="flex flex-col mt-10 w-full max-w-2xl gap-7">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">First</th>
                  <th scope="col" className="px-6 py-4">Last</th>
                  <th scope="col" className="px-6 py-4">Handle</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td className="whitespace-nowrap px-6 py-4">Mark</td>
                  <td className="whitespace-nowrap px-6 py-4">Otto</td>
                  <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                  <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                  <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                  <td className="whitespace-nowrap px-6 py-4">@fat</td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                  <td className="whitespace-nowrap px-6 py-4">Larry</td>
                  <td className="whitespace-nowrap px-6 py-4">Wild</td>
                  <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>*/}
      {/*<div className="flex items-center justify-center">
        <div className="container">
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="text-white">
            <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left" width="110px">Actions</th>
            </tr>
            <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left" width="110px">Actions</th>
            </tr>
            <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left" width="110px">Actions</th>
            </tr>
            <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left" width="110px">Actions</th>
            </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">John Covv</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">contato@johncovv.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">Michael Jackson</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">m_jackson@mail.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">Julia</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">julia@mail.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">Martin Madrazo</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">martin.madrazo@mail.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>*/}
      <DataTable
        data={users}
        headers={headers}
        handleEdit={handleEdit}
        handleDelete={test}
      />
    </div>
  );
};

export default Users;
