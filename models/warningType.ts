import { Schema, model, models, Document, Model } from "mongoose";

interface IWarningType extends Document {
  name: string;
  points_number: number;
}

const WarningTypeSchema = new Schema<IWarningType>({
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

const WarningType: Model<IWarningType> = models.WarningType || model<IWarningType>("WarningType", WarningTypeSchema);

export default WarningType;
