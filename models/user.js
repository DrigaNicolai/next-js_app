import { Schema, model, models } from "mongoose";
import Prompt from "@models/prompt";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists."],
    required: [true, "Email is required."],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
    match: [
      /^(?=.{4,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Zа-яА-Я0-9\s\-._]+(?<![_.])$/,
      // /^(?!.*[._\-\s]$)(?=.*[a-zA-Zа-яА-Я0-9])[a-zA-Zа-яА-Я0-9._\-\s]{4,50}$/,
      // /^.{4,50}$/,
      "Username invalid, it should contain 4-50 alphanumeric letters."
    ],
  },
  image: {
    type: String
  },
  role_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Role is required"],
    ref: "Role",
    default: "6505c48adba63bdf1b69486f"
  }
});

UserSchema.pre("deleteOne", { document: true, query: true }, async function (next)  {
  try {
    console.log("User Middleware is triggered");
    const user = await this.model.findOne(this.getFilter(), { _id: 1 }).lean();

    await Prompt.deleteMany({ creator: user._id });

    next();
  } catch (error) {
    next(error);
  }
});

const User = models.User || model("User", UserSchema);

export default User;
