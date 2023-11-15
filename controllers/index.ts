import UserController from "@controllers/UserController";
import WarningTypeController from "@controllers/WarningTypeController";
import TagController from "@controllers/TagController";
import TagApplicationController from "@controllers/TagApplicationController";
import PostController from "@controllers/PostController";
import ReportController from "@controllers/ReportController";

export default {
  userController: () => new UserController(),
  warningTypeController: () => new WarningTypeController(),
  tagController: () => new TagController(),
  tagApplicationController: () => new TagApplicationController(),
  postController: () => new PostController(),
  reportController: () => new ReportController()
}
