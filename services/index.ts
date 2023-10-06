import UserService from "@services/UserService";
import WarningTypeService from "@services/WarningTypeService";

export default {
  userService: () => new UserService(),
  warningTypeService: () => new WarningTypeService()
}
