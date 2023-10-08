"use client";

import React, {useEffect, useState} from 'react';
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IUser } from "@ts/interface/user";
import UserForm from "@components/form/UserForm";
import { IRole } from "@ts/interface/role";
import { useSession } from "@node_modules/next-auth/react";
import CustomSession from "@ts/interface/customAuth";
import { useUserRole } from "@middleware/useUserRole";

interface IUserEdit {
  params: any;
}

const EditUser = ({ params }: IUserEdit) => {
  const user = useUserRole(["admin"]) as string;
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    email: "",
    role: ""
  } as IUser);
  const [roles, setRoles] = useState([] as Array<IRole>);

  useEffect(() => {
    const getUserDetails = async (): Promise<any> => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json() as IUser;

      setUserData({
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role_id._id
      });
    }

    const getRoles = async (): Promise<any> => {
      const response = await fetch(`/api/roles`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });

      const data = await response.json() as Array<IRole>;

      setRoles(data);
    }

    if (!user) {
      router.replace("/");
    }

    if (params.id) {
      getUserDetails();
      getRoles();
    }
  }, [params.id, user]);

  const updateUser = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    if (!params.id) {
      return alert("Missing user id!");
    }

    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
          role_id: userData.role
        }),
      });

      if (response.ok) {
        router.push("/users");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Edit user data</span>
      </h1>
      <UserForm
        roles={roles}
        user={userData}
        setUser={setUserData}
        submitting={submitting}
        handleSubmit={updateUser}
      />
    </section>
  );
};

export default EditUser;
