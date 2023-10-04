import { IResponse } from "@ts/interface/global";
import userService from "@/services/index";

export default class UserController {
  async getAllUsers(): Promise<IResponse> {
    try {
      const users = await userService.userService().getAllUsers();

      if (!users) {
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

  async getUser(id: string): Promise<IResponse> {
    try {
      const user = await userService.userService().getUser(id);

      if (!user) {
        return {
          status: 404,
          response: { message: "User not found" },
        };
      }

      return {
        status: 200,
        response: user,
      };
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch user ${error.message}` },
      };
    }
  }

  async deleteUser(id: string): Promise<IResponse> {
    try {
      const user = await userService.userService().getUser(id);

      if (!user) {
        return {
          status: 404,
          response: { message: "User not found" },
        };
      }

      await userService.userService().deleteUser(user);

      return {
        status: 200,
        response: { message: "User was deleted successfully" },
      };
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to delete user ${error.message}` },
      };
    }
  }

  async updateUser(id: string, body: object) {
    try {
      const user = await userService.userService().getUser(id);

      if (!user) {
        return {
          status: 404,
          response: { message: "User not found" },
        };
      }

      await userService.userService().updateUser(id, body);

      return {
        status: 200,
        response: { message: "User was successfully updated" },
      };
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to update user ${error.message}` },
      };
    }
  }
}
