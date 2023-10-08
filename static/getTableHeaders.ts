import { IHeaders } from "@ts/interface/global";

export const getTableHeaders = (module: string): Array<IHeaders> => {
  switch (module) {
    case "users":
      return [
        {text: "Username", value: "username"},
        {text: "Email", value: "email"},
        {text: "Role", value: "role"},
      ];
    case "warningTypes":
      return [
        {text: "Name", value: "name"},
        {text: "Points number", value: "points_number"}
      ];
    default:
      return [];
  }
}
