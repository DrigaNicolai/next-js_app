import Tag from "@models/tag";
import mongoose from "mongoose";
import { ITag } from "@ts/interface/tag";

export default class TagService {
  async getAllTags(): Promise<any> {
    return Tag.find({});
  }

  async create(body: object): Promise<any> {
    await Tag.create(body);
  }

  async getTag(id: string): Promise<any> {
    return Tag.findById(id);
  }

  async updateTag(id: string, payload: object): Promise<any> {
    await Tag.updateOne({ _id: id }, payload);
  }

  async deleteTag(tag: mongoose.Model<ITag>): Promise<any> {
    return Tag.deleteOne(tag);
  }
}