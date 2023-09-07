import { Schema, model, models } from "mongoose";

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
  }
});

const User = models.User || model("User", UserSchema);

export default User;
