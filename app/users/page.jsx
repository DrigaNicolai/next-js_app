"use client";

import { useUserRole } from "@middleware/useUserRole";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Users = () => {
  const user = useUserRole(["admin", "user"]); // TODO: Remove user
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session.token}`
        }
      });

      // const data = await response.json();

      // console.log(data);
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
