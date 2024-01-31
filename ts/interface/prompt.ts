import { IUser } from "@ts/interface/user";
import { ITag } from "@ts/interface/tag";

export interface IPrompt {
  _id: string | number,
  createdBy: IUser;
  title: string;
  text: string;
  tag_id: ITag | string | any;
}
