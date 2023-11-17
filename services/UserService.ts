import User from "@models/user";
import Role from "@models/role";
import mongoose from "mongoose";
import Prompt from "@models/prompt";
import Warning from "@models/warning";
import { ObjectId } from "mongodb";

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

  async getUserPosts(id: string): Promise<any> {
    return Prompt
      .find({ createdBy: id })
      .populate("createdBy")
      .populate("tag_id");
  }

  async getUserWarnings(id: string): Promise<any> {
    return Warning.find({ intruder_id: id }).populate("warning_type_id").populate("moderator_id");
  }

  async getTotalUsers(): Promise<any> {
    return User.find({}).count();
  }

  async getUserFrequentTags(userId: string, quantity: number): Promise<any> {
    const user = new ObjectId(userId);

    return User.aggregate([
      {
        $match: {
          _id: user
        }
      },
      {
        $lookup: {
          from: "prompts",
          localField: "_id",
          foreignField: "createdBy",
          as: "prompts"
        }
      },
      {
        $unwind: "$prompts"
      },
      {
        $group: {
          _id: "$prompts.tag_id",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: quantity
      },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tag_data"
        }
      },
      {
        $unwind: "$tag_data"
      },
      {
        $project: {
          tag_name: "$tag_data.name",
          _id: 0
        }
      }
    ]);
  }
}
