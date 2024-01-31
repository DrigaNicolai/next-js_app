import { IRole } from "@ts/interface/role";

export interface IUser {
  _id: string,
  id?: string,
  email: string;
  username: string;
  image?: string;
  role_id?: IRole;
  role?: string;
}
