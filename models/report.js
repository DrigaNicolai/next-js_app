import { Schema, model, models } from "mongoose";

const ReportSchema = new Schema({
  victim: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: "Prompt"
  },
  message: {
    type: String,
    required: [true, "Message for report is required."]
  }
});

const Report = models.Report || model("Report", ReportSchema);

export default Report;
