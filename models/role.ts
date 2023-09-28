import { Schema, model, models, Document, Model  } from "mongoose";

interface IRole extends Document {
  name: string;
  alias: string;
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    match: [
      /^[a-z]{2,20}$/, "Invalid role name, it should contain 2-20 symbols and be in lowercase."
    ],
    required: [true, "Role name is required"]
  },
  alias: {
    type: String,
    math: [
      /^[A-Z][a-z]{1,19}$/, "Invalid role alias, it should contain 2-20 symbols and starts with uppercase letter."
    ],
    required: [true, "Role name is required"]
  }
});

const Role: Model<IRole> = models.Role || model<IRole>("Role", RoleSchema);

export default Role;
