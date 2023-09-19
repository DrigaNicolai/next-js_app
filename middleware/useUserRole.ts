import { Session, useSession } from "next-auth/react";

export function useUserRole(roles: Array<string>) {
  const { data: session } = useSession() as Session;

  /*useEffect(() => {
    const getRole = async () => {
      if (session) {
        const userRole = await getUserRole(session?.user.id);

        /!*userRole.then((res) => setUserRoleName(res))
          .catch(() => { console.log("Error to parse user role") });*!/
        setUserRoleName(userRole);
      }
    }

    getRole();
  }, [session]);*/

  if (!session) {
    return null;
  }

  if (!roles.includes(session?.user.role)) {
    return null;
  }

  return session?.user.role;
}
