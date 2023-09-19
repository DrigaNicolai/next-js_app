import { Schema, model, models, Document, Model, Types } from "mongoose";
import Prompt from "@models/prompt";
import Warning from "@models/warning";

interface IUser extends Document {
  email: string;
  username: string;
  image?: string;
  role_id: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
    validate: {
      validator: async function (value: string) {
        const user = await this.constructor.findOne({ email: value });

        return !user;
      },
      message: "Email already exists.",
    },
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

UserSchema.pre<IUser | any>("deleteOne", { document: true, query: true }, async function (next)  {
  try {
    console.log("User Middleware is triggered");
    const findUser = await this.model.findOne(this.getFilter(), { _id: 1 }).lean();

    await Prompt.deleteMany({ createdBy: findUser._id });

    await Warning.deleteMany({ intruder_id: findUser._id });

    next();
  } catch (error) {
    next(error);
  }
});

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
