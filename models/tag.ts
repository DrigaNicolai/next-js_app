import { Schema, model, models, Document, Model, Types } from "mongoose";

interface ITag extends Document {
  name: string;
  description: string;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: [true, "Name is required for tag"],
    match: [
      /^[a-z_,\-]{2,30}$/, "Invalid name for tag"
    ],
    validate: {
      validator: async function (value: string) {
        const tag = await this.constructor.findOne({ name: value });

        return !tag;
      },
      message: "Tag already exists.",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required for tag"],
    match: [
      /^.{5,255}$/, "Invalid description for tag"
    ]
  }
});

const Tag: Model<ITag> = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
