import { Schema, model, models } from "mongoose";

const WarningSchema = new Schema({
  moderator_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Moderator is required to create warning"],
    ref: "User"
  },
  intruder_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Intruder is required to create warning"],
    ref: "User"
  },
  warning_type_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Warning type is required to create warning"],
    ref: "WarningType"
  },
  comment: {
    type: String,
    match: [
      /^.{5,100}$/, "Invalid warning comment, it should contain 5-100 symbols."
    ],
    required: [true, "Warning comment is required."]
  },
});

const Warning = models.WarningType || model("Warning", WarningSchema);

export default Warning;
