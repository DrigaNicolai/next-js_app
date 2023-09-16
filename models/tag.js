import { Schema, model, models } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required for tag"],
    match: [
      /^[a-z_,\-]{2,30}$/, "Invalid name for tag"
    ]
  },
  description: {
    type: String,
    required: [true, "Description is required for tag"],
    match: [
      /^.{5,255}$/, "Invalid description for tag"
    ]
  }
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
