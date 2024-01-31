import UserService from "@services/UserService";
import WarningTypeService from "@services/WarningTypeService";
import TagService from "@services/TagService";
import TagApplicationService from "@services/TagApplicationService";
import PostService from "@services/PostService";
import ReportService from "@services/ReportService";
import WarningService from "@services/WarningService";

export default {
  userService: () => new UserService(),
  warningTypeService: () => new WarningTypeService(),
  tagService: () => new TagService(),
  tagApplicationService: () => new TagApplicationService(),
  postService: () => new PostService(),
  reportService: () => new ReportService(),
  warningService: () => new WarningService()
}
