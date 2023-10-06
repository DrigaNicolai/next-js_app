import WarningType from "@models/warningType";

export default class WarningTypeService {
  async getAllWarningTypes(): Promise<any> {
    return WarningType.find({});
  }
}