import { IUser } from "@ts/interface/user";

export interface ITagApplication {
  _id: string | number,
  name: string;
  description: string;
  applicant_id: IUser;
}
