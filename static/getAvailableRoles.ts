export const getAvailableRoles = (action: string): Array<string> => {
  switch (action) {
    case "GET-/api/users":
      return ["admin", "moderator"];
    case "GET-/api/users/:id":
      return ["admin"];
    case "GET-/api/roles":
      return ["admin"];
    case "DELETE-/api/users/:id":
      return ["admin", "moderator"];
    case "PATCH-/api/users/:id":
      return ["admin"];
    case "POST-/api/warning-types/create":
      return ["admin"];
    case "PATCH-/api/warning-types/:id":
      return ["admin"];
    case "DELETE-/api/warning-types/:id":
      return ["admin"];
    case "POST-/api/tags/create":
      return ["admin", "moderator"];
    case "PATCH-/api/tags/:id":
      return ["admin", "moderator"];
    case "DELETE-/api/tags/:id":
      return ["admin", "moderator"];
    default:
      return ["user"];
  }
}
