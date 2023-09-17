import { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
  victim_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User should be authenticated to send a report."]
  },
  prompt_id: {
    type: Schema.Types.ObjectId,
    ref: "Prompt",
    required: [true, "Prompt is required to send a report."]
  },
  message: {
    type: String,
    match: [
      /^.{4,255}$/, "Invalid report message, it should contain 4-255 symbols."
    ],
    required: [true, "Message for report is required."]
  }
});

const Report = models.Report || model("Report", ReportSchema);

export default Report;
