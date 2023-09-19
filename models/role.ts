import { Schema, model, models, Document, Model  } from "mongoose";

interface IRole extends Document {
  name: string
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    match: [
      /^[a-z]{2,20}$/, "Invalid role name, it should contain 2-20 symbols."
    ],
    required: [true, "Role name is required"]
  }
});

const Role: Model<IRole> = models.Role || model<IRole>("Role", RoleSchema);

export default Role;
