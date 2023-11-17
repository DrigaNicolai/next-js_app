import Warning from "@models/warning";
import mongoose from "mongoose";
import { IWarning } from "@ts/interface/warning";
import { ObjectId } from "mongodb";
import warning from "@models/warning";

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

  async getUserWarningPoints(userId: string): Promise<any> {
    const user = new ObjectId(userId);

    return Warning.aggregate([
      {
        $match: {
          intruder_id: user
        }
      },
      {
        $lookup: {
          from: "warningtypes",
          localField: "warning_type_id",
          foreignField: "_id",
          as: "warningTypeData"
        }
      },
      {
        $unwind: "$warningTypeData"
      },
      {
        $group: {
          _id: null,
          total_points: { $sum: "$warningTypeData.points_number" }
        }
      },
      {
        $project: {
          _id: 0,
          total_points: 1
        }
      }
    ]);
  }
}
