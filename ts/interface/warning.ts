import { IUser } from "@ts/interface/user";
import { IWarningType } from "@ts/interface/warningType";

export interface IWarning {
  _id: string | number,
  moderator_id: IUser;
  intruder_id: IUser;
  warning_type_id: IWarningType;
  comment: string;
}
