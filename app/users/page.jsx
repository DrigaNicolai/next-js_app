"use client";

import { useUserRole } from "@middleware/useUserRole";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Users = () => {
  const user = useUserRole(["admin", "user"]); // TODO: Remove user
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div>
      USERS TEST
    </div>
  );
};

export default Users;
