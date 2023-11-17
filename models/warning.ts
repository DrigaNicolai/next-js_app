import { Schema, model, models, Document, Model, Types } from "mongoose";

interface IWarning extends Document {
  moderator_id: Types.ObjectId;
  intruder_id: Types.ObjectId;
  warning_type_id: Types.ObjectId;
  comment: string;
}

const WarningSchema = new Schema<IWarning>({
  moderator_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Moderator is required to edit warning"],
    ref: "User"
  },
  intruder_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Intruder is required to edit warning"],
    ref: "User"
  },
  warning_type_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Warning type is required to edit warning"],
    ref: "WarningType"
  },
  comment: {
    type: String,
    match: [
      /^.{5,100}$/, "Invalid warning comment, it should contain 5-100 symbols."
    ],
    required: [true, "Warning comment is required."]
  },
}, { timestamps: true });

const Warning: Model<IWarning> = models.Warning || model<IWarning>("Warning", WarningSchema);

export default Warning;
