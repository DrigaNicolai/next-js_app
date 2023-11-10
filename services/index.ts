import UserService from "@services/UserService";
import WarningTypeService from "@services/WarningTypeService";
import TagService from "@services/TagService";
import TagApplicationService from "@services/TagApplicationService";
import PostService from "@services/PostService";

export default {
  userService: () => new UserService(),
  warningTypeService: () => new WarningTypeService(),
  tagService: () => new TagService(),
  tagApplicationService: () => new TagApplicationService(),
  postService: () => new PostService()
}
