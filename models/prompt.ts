import { Schema, model, models, Document, Model, Types } from "mongoose";
import Report from "@models/report";

interface IPrompt extends Document {
  createdBy: Types.ObjectId;
  title: string;
  text: string;
  tag_id: Types.ObjectId;
}

const PromptSchema = new Schema<IPrompt>({
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
    type: Schema.Types.ObjectId,
    required: [true, "Tag is required."],
    ref: "Tag",
  }
}, { timestamps: true });

PromptSchema.pre<IPrompt | any>("deleteOne", { document: true, query: true }, async function (next)  {
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

PromptSchema.pre<IPrompt | any>("deleteMany", { document: true, query: true }, async function (next)  {
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

const Prompt: Model<IPrompt> = models.Prompt || model<IPrompt>("Prompt", PromptSchema);

export default Prompt;
