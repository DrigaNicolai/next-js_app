import UserController from "@controllers/UserController";
import WarningTypeController from "@controllers/WarningTypeController";
import TagController from "@controllers/TagController";
import TagApplicationController from "@controllers/TagApplicationController";

export default {
  userController: () => new UserController(),
  warningTypeController: () => new WarningTypeController(),
  tagController: () => new TagController(),
  tagApplicationController: () => new TagApplicationController()
}
