"use client";

import React, {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IUser } from "@ts/interface/user";

interface IUserEdit {
  params: any;
}

const EditUser = ({ params }: IUserEdit) => {
  const router = useRouter() as AppRouterInstance;

  const [submitting, setSubmitting] = useState(false as boolean);
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json() as IUser;

      setUser({
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role_id.name
      });
    }

    if (params.id) {
      getUserDetails();
      console.log(user);
    }
  }, [params.id]);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Edit user data</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700"></span>
        </label>
      </form>

    </section>
  );
};

export default EditUser;
