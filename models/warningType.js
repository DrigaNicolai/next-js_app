import { Schema, model, models } from "mongoose";

const WarningTypeSchema = new Schema({
  name: {
    type: String,
    match: [
      /^.{3,40}$/, "Invalid warning type name, it should contain 3-40 symbols."
    ],
    required: [true, "Warning type name is required."]
  },
  points_number: {
    type: Number,
    min: [1, "Minimal value for points number is 1"],
    max: [16, "Maximal value for points number is 16"],
    required: [true, "Warning type points number is required."]
  }
});

const WarningType = models.WarningType || model("WarningType", WarningTypeSchema);

export default WarningType;
