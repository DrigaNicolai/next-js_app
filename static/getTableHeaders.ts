import { IHeaders } from "@ts/interface/global";

export const getTableHeaders = (module: string): Array<IHeaders> => {
  switch (module) {
    case "users":
      return [
        {text: "Username", value: "username"},
        {text: "Email", value: "email"},
        {text: "Role", value: "role"},
      ];
    default:
      return [];
  }
}
