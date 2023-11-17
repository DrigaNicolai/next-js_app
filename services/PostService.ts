import Prompt from "@models/prompt";
import mongoose from "mongoose";
import { IPrompt } from "@ts/interface/prompt";

export default class PostService {
  async getAllPosts(): Promise<any> {
    return Prompt.find({}).populate("createdBy").populate("tag_id");
  }

  async create(body: object): Promise<any> {
    await Prompt.create(body);
  }

  async getPost(id: string): Promise<any> {
    return Prompt.findById(id);
  }

  async updatePost(id: string, payload: object): Promise<any> {
    await Prompt.updateOne({ _id: id }, payload);
  }

  async deletePost(post: mongoose.Model<IPrompt>): Promise<any> {
    return Prompt.deleteOne(post);
  }

  async getTotalPosts(): Promise<any> {
    return Prompt.find({}).count();
  }

  async getTotalUserPosts(userId: string): Promise<any> {
    return Prompt.find({ createdBy: userId }).count();
  }

  async getFrequentTags(quantity: number): Promise<any> {
    return Prompt.aggregate([
      {
        $lookup: {
          from: "tags",
          localField: "tag_id",
          foreignField: "_id",
          as: "tagData"
        }
      },
      {
        $unwind: "$tagData"
      },
      {
        $group: {
          _id: "$tagData._id",
          tag_name: { $first: "$tagData.name" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: quantity }
    ]);
  }
}
