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

PromptSchema.pre("deleteOne", { document: true, query: true }, async function (next)  {
  try {
    console.log("Middleware is triggered");
    const prompt = await this.model.findOne(this.getFilter(), { _id: 1 }).lean();
    console.log("Found prompt:", prompt);

    await Report.deleteMany({ prompt: prompt._id });
    console.log("Deleted associated reports");

    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    next(error);
  }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
