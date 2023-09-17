import { getSession } from "next-auth/react";

const isAdmin = async (req, res, next) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return new Response("Unauth", { status: 401 });
    }

    const userRole = session.user.role;

    console.log(userRole)

    if (userRole !== "admin") {
      return new Response("Forbidden", { status: 403 });
    }

    next();
  } catch (error) {
    return new Response("Internal", { status: 500 });
  }
};

export default isAdmin;
