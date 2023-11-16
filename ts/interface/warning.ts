import { IUser } from "@ts/interface/user";
import { IWarningType } from "@ts/interface/warningType";

export interface IWarning {
  _id?: string | number,
  moderator_id?: IUser | string | any;
  intruder_id: IUser | string | any;
  warning_type_id: IWarningType | string | any;
  comment: string;
  moderator_name?: string;
  intruder_name?: string;
  warning_type_name?: string;
}
