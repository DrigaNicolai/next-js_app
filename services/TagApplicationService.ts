import TagApplication from "@models/tagApplication";
import mongoose from "mongoose";
import { ITagApplication } from "@ts/interface/tagApplication";

export default class TagApplicationService {
  async getAll(): Promise<any> {
    return TagApplication.find({}).populate("applicant_id");
  }

  async create(body: object): Promise<any> {
    await TagApplication.create(body);
  }

  async getTagApplication(id: string): Promise<any> {
    return TagApplication.findById(id);
  }

  async deleteTagApplication(tagApplication: mongoose.Model<ITagApplication>): Promise<any> {
    return TagApplication.deleteOne(tagApplication);
  }
}
