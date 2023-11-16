import Warning from "@models/warning";
import mongoose from "mongoose";
import { IWarning } from "@ts/interface/warning";

export default class WarningService {
  async getAllWarnings(): Promise<any> {
    return Warning.find({}).populate("moderator_id").populate("warning_type_id").populate("intruder_id");
  }

  async create(body: object): Promise<any> {
    await Warning.create(body);
  }

  async getWarning(id: string): Promise<any> {
    return Warning.findById(id);
  }

  async updateWarning(id: string, payload: object): Promise<any> {
    await Warning.updateOne({ _id: id }, payload);
  }

  async deleteWarning(warning: mongoose.Model<IWarning>): Promise<any> {
    return Warning.deleteOne(warning);
  }
}
