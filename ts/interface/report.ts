import { IUser } from "@ts/interface/user";

export interface IReport {
  _id: string | number,
  victim_id: IUser,
  prompt_id: IUser,
  message: string,
  victim_name?: string,
  post_title?: string,
  post_text?: string,
  post_tag?: string
}
