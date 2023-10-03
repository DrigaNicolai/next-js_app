import UserService from "@services/UserService";

export default {
  userService: () => new UserService()
}
