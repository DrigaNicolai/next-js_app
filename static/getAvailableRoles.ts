export const getAvailableRoles = (action: string): Array<string> => {
  switch (action) {
    case "GET-/api/users":
      return ["admin", "moderator"]; // TODO: Remove user,
    /*case "updateUser":
      return ["admin"]; // TODO: Remove user,
    case "deleteUser":
      return ["admin", "moderator"]; // TODO: Remove user,
    case "getRoles":
      return ["admin"]; // TODO: Remove user*/
    default:
      return ["user"];
  }
}
