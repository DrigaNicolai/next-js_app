import { Schema, model, models, Document, Model, Types } from "mongoose";

interface IReport extends Document {
  victim_id: Types.ObjectId,
  prompt_id: Types.ObjectId,
  message: string
}

const ReportSchema = new Schema<IReport>({
  victim_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User should be authenticated to send a report."]
  },
  prompt_id: {
    type: Schema.Types.ObjectId,
    ref: "Prompt",
    required: [true, "Post is required to send a report."]
  },
  message: {
    type: String,
    match: [
      /^.{4,255}$/, "Invalid report message, it should contain 4-255 symbols."
    ],
    required: [true, "Message for report is required."]
  }
});

const Report: Model<IReport> = models.Report || model<IReport>("Report", ReportSchema);

export default Report;
