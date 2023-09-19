export const getAvailableRoles = (action: string): Array<string> => {
  switch (action) {
    case "getUsers":
      return ["admin", "moderator", "user"]; // TODO: Remove user
    default:
      return ["user"];
  }
}
