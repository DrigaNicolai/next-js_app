import UserService from "@services/UserService";
import WarningTypeService from "@services/WarningTypeService";
import TagService from "@services/TagService";

export default {
  userService: () => new UserService(),
  warningTypeService: () => new WarningTypeService(),
  tagService: () => new TagService()
}
