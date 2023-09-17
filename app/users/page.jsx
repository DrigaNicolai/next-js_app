"use client";

import { useUserRole } from "@middleware/useUserRole";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Users = () => {
  const user = useUserRole(["admin", "user"]); // TODO: Remove user
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users`,{
        method: "GET"
      });
      const data = await response.json();

      console.log(data);
    }

    if (!user) {
      router.replace("/");
    }

    fetchUsers();
  }, [user]);

  return (
    <div>
      USERS TEST
    </div>
  );
};

export default Users;
