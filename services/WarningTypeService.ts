import WarningType from "@models/warningType";
import mongoose from "mongoose";
import {IWarningType} from "@ts/interface/warningType";

export default class WarningTypeService {
  async getAllWarningTypes(): Promise<any> {
    return WarningType.find({});
  }

  async create(body: object): Promise<any> {
    await WarningType.create(body);
  }

  async getWarningType(id: string): Promise<any> {
    return WarningType.findById(id);
  }

  async updateWarningType(id: string, payload: object): Promise<any> {
    await WarningType.updateOne({ _id: id }, payload);
  }

  async deleteWarningType(warningType: mongoose.Model<IWarningType>): Promise<any> {
    return WarningType.deleteOne(warningType);
  }
}
