import { IResponse } from "@ts/interface/global";
import User from "@models/user";

export default class UserController {
  async getUsers(): Promise<any> {
    try {
      const users = await User.find({}).populate('role_id');

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
