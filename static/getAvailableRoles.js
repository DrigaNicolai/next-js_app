export const getAvailableRoles = (action) => {
  switch (action) {
    case "getUsers":
      return ["admin", "moderator", "user"]; // TODO: Remove user
    default:
      return ["user"];
  }
}
