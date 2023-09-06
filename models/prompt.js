import { Schema, model, models } from "mongoose";
import Report from "@models/report";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  }
});

PromptSchema.pre("deleteOne", { document: true, query: false }, async function (next)  {
  const prompt = await this.model
    .findOne(this.getFilter(), { _id: 1 })
    .lean();

  // TODO: WIP
  /*const reports = await Report.find({ prompt: prompt._id });

  if (reports.length) {
    await Report.deleteMany({ prompt: prompt._id });
  }*/

  await Report.deleteMany({ prompt: prompt._id });

  next();
});


const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
