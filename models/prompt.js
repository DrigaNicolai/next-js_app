import { Schema, model, models } from "mongoose";
import Report from "@models/report";

const PromptSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Prompt should have a creator."]
  },
  title: {
    type: String,
    match: [
      /^.{2,30}$/, "Invalid prompt title, it should contain 2-30 symbols."
    ],
  },
  text: {
    type: String,
    match: [
      /^.{5,255}$/, "Invalid prompt message, it should contain 5-255 symbols."
    ],
    required: [true, "Prompt is required."],
  },
  tag_id: {
    type: String,
    required: [true, "Tag is required."],
    ref: "Tag",
  }
}, { timestamps: true });

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

PromptSchema.pre("deleteMany", { document: true, query: true }, async function (next)  {
  try {
    console.log("Prompt delete many middleware")
    const prompts = await this.model.find(this.getFilter(), { _id: 1 }).lean();

    for (const prompt of prompts) {
      await Report.deleteOne({ prompt: prompt._id });
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
