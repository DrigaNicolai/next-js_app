import { IResponse } from "@ts/interface/global";
import userService from "@/services/index";
import Prompt from "@models/prompt";

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
        status: 204,
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

  async getUserPosts(id: string) {
    try {
      const posts = await userService.userService().getUserPosts(id);

      if (!posts) {
        return {
          status: 404,
          response: {message: "User posts not found"},
        };
      }

      return {
        status: 200,
        response: posts,
      };
    } catch (error) {
      return {
        status: 500,
        response: {message: `Failed to fetch user posts ${error.message}`},
      };
    }
  }

  async getUserWarnings(id: string) {
    try {
      const warnings = await userService.userService().getUserWarnings(id);

      if (!warnings) {
        return {
          status: 404,
          response: {message: "User warnings not found"},
        };
      }

      return {
        status: 200,
        response: warnings,
      };
    } catch (error) {
      return {
        status: 500,
        response: {message: `Failed to fetch user warnings ${error.message}`},
      };
    }
  }
}
