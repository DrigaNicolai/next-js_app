import User from "@models/user";
import Role from "@models/role";
import mongoose from "mongoose";

export default class UserService {
  async getAllUsers(): Promise<any> {
    return User.find({}).populate('role_id');
  }

  async getUser(id: string): Promise<any> {
    return User.findById(id).populate("role_id");
  }

  async deleteUser(user: mongoose.Model<any>): Promise<any> {
    return User.deleteOne(user);
  }

  async updateUser(id: string, payload: object): Promise<any> {
    await User.updateOne({ _id: id },  payload);
  }
}
