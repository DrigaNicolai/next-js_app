import WarningType from "@models/warningType";

export default class WarningTypeService {
  async getAllWarningTypes(): Promise<any> {
    return WarningType.find({});
  }

  async create(body: object): Promise<any> {
    await WarningType.create(body);
  }
}
