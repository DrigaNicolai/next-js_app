import { Schema, model, models } from "mongoose";

const RoleSchema = new Schema({
  name: {
    type: String,
    match: [
      /^[a-z]{2,20}$/, "Invalid role name, it should contain 2-20 symbols."
    ],
    required: [true, "Role name is required"]
  }
});

const Role = models.Role || model("Role", RoleSchema);

export default Role;
