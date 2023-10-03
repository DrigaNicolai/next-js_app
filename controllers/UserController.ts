import { IResponse } from "@ts/interface/global";
import userService from "@/services/index";

export default class UserController {
  async getUsers(): Promise<IResponse> {
    try {
      const users = await userService.userService().getUsers();

      if (!users || users.length === 0) {
        return {
          status: 404,
          response: { message: "Users not found" },
        };
      }

      return {
        status: 200,
        response: users,
      };
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all users ${error.message}` },
      };
    }
  }
}
