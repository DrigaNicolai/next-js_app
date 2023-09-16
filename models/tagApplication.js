import { Schema, model, models } from "mongoose";

const TagApplicationSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required for tag application"],
    match: [
      /^[a-z_,\-]{2,30}$/, "Invalid name for tag application"
    ]
  },
  description: {
    type: String,
    required: [true, "Description is required for tag application"],
    match: [
      /^.{5,255}$/, "Invalid description for tag application"
    ]
  },
  applicant_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Applicant is required"],
    ref: "User"
  }
});

const TagApplication = models.TagApplication || model("TagApplication", TagApplicationSchema);

export default TagApplication;
