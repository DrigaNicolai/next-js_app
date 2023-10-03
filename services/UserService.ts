import User from "@models/user";

export default class UserService {
  async getUsers(): Promise<any> {
    return User.find({}).populate('role_id');
  }
}
