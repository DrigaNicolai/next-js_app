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
    case "tags":
      return [
        {text: "Name", value: "name"},
        {text: "Description", value: "description"}
      ];
    case "tagApplications":
      return [
        {text: "Username", value: "username"},
        {text: "Tag name", value: "tag_name"},
        {text: "Description", value: "description"}
      ];
    case "reports":
      return [
        {text: "Victim name", value: "victim_name"},
        {text: "Report message", value: "message"},
        {text: "Post title", value: "post_title"},
        {text: "Post text", value: "post_text"},
        {text: "Post tag", value: "post_tag"}
      ];
    case "warnings":
      return [
        {text: "Moderator name", value: "moderator_name"},
        {text: "Intruder name", value: "intruder_name"},
        {text: "Warning type name", value: "warning_type_name"},
        {text: "Comment", value: "comment"},
      ];
    default:
      return [];
  }
}
