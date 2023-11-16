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
    case "GET-/api/warning-types":
      return ["admin", "moderator", "user"];
    case "GET-/api/warning-types/:id":
      return ["admin"];
    case "PATCH-/api/warning-types/:id":
      return ["admin"];
    case "DELETE-/api/warning-types/:id":
      return ["admin"];
    case "GET-/api/tags":
      return ["admin", "moderator", "user"];
    case "POST-/api/tags/create":
      return ["admin", "moderator"];
    case "GET-/api/tags/:id":
      return ["admin", "moderator"];
    case "PATCH-/api/tags/:id":
      return ["admin", "moderator"];
    case "DELETE-/api/tags/:id":
      return ["admin", "moderator"];
    case "POST-/api/tag-applications/create": // TODO: DELETE THIS CASE, ONLY FOR USER ROLE
      return ["admin", "user"];
    case "DELETE-/api/tag-applications/:id":
      return ["admin", "moderator"];
    case "POST-/api/tags/create/application":
      return ["admin", "moderator"];
    case "POST-/api/posts/create":
      return ["admin", "moderator", "user"];
    case "GET-/api/posts/:id":
      return ["admin", "moderator", "user"];
    case "PATCH-/api/posts/:id":
      return ["admin", "moderator", "user"];
    case "DELETE-/api/posts/:id":
      return ["admin", "moderator", "user"];
    case "GET-/api/reports":
      return ["admin", "moderator"];
    case "POST-/api/reports/create":
      return ["admin", "moderator", "user"];
    case "GET-/api/reports/:id":
      return ["admin", "moderator"];
    case "DELETE-/api/reports/:id":
      return ["admin", "moderator"];
    case "GET-/api/warnings":
      return ["admin", "moderator"];
    case "POST-/api/warnings/create":
      return ["admin", "moderator"];
    case "GET-/api/warnings/:id":
      return ["admin"];
    case "PATCH-/api/warnings/:id":
      return ["admin"];
    case "DELETE-/api/warnings/:id":
      return ["admin"];
    default:
      return ["user"];
  }
}
