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

  async getWarningType(id: string): Promise<IResponse> {
    try {
      const warningType = await warningTypeService.warningTypeService().getWarningType(id);

      if (!warningType) {
        return {
          status: 404,
          response: { message: "Warning type not found" }
        }
      }

      return {
        status: 200,
        response: warningType
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch warning type ${error.message}` }
      }
    }
  }

  async updateWarningType(id: string, body: object): Promise<IResponse> {
    try {
      await warningTypeService.warningTypeService().updateWarningType(id, body);

      return {
        status: 200,
        response: { message: "Warning type was successfully updated" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to update warning type ${error.message}` }
      }
    }
  }

  async deleteWarningType(id: string): Promise<IResponse> {
    try {
      const warningType = await warningTypeService.warningTypeService().getWarningType(id);

      if (!warningType) {
        return {
          status: 404,
          response: { message: "Warning type not found" }
        }
      }

      await warningTypeService.warningTypeService().deleteWarningType(warningType);

      return {
        status: 204,
        response: { message: "Warning type was deleted successfully" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to delete warning type ${error.message}` }
      }
    }
  }
}
