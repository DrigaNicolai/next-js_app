import Report from "@models/report";
import mongoose from "mongoose";
import { IReport } from "@ts/interface/report";

export default class ReportService {
  async getAllReports(): Promise<any> {
    return Report.find({}).populate("victim_id").populate({path: "prompt_id", populate: { path: "tag_id" }});
  }

  async create(body: object): Promise<any> {
    await Report.create(body);
  }

  async getReport(id: string): Promise<any> {
    return Report.findById(id);
  }

  async deleteReport(report: mongoose.Model<IReport>): Promise<any> {
    return Report.deleteOne(report);
  }
}
