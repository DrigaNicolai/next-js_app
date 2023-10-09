import UserController from "@controllers/UserController";
import WarningTypeController from "@controllers/WarningTypeController";
import TagController from "@controllers/TagController";

export default {
  userController: () => new UserController(),
  warningTypeController: () => new WarningTypeController(),
  tagController: () => new TagController()
}
