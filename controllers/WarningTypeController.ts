import { IResponse } from "@ts/interface/global";
import warningTypeService from "@/services/index";

export default class WarningTypeController {
  async getAllWarningTypes(): Promise<IResponse> {
    try {
      const warningTypes = await warningTypeService.warningTypeService().getAllWarningTypes();

      if (!warningTypes) {
        return {
          status: 404,
          response: { message: "Warning types not found" }
        }
      }

      return {
        status: 200,
        response: warningTypes
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all warning types ${error.message}` }
      }
    }
  }

  async create(body: object): Promise<IResponse> {
    try {
      await warningTypeService.warningTypeService().create(body);

      return {
        status: 201,
        response: { message: "Warning type was successfully created" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all warning types ${error.message}` }
      }
    }
  }
}
