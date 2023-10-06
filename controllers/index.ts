import UserController from "@controllers/UserController";
import WarningTypeController from "@controllers/WarningTypeController";

export default {
  userController: () => new UserController(),
  warningTypeController: () => new WarningTypeController()
}
