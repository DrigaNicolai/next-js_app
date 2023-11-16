import { IResponse } from "@ts/interface/global";
import warningService from "@services/index";

export default class WarningController {
  async getAllWarnings(): Promise<IResponse> {
    try {
      const warnings = await warningService.warningService().getAllWarnings();

      if (!warnings) {
        return {
          status: 404,
          response: { message: "Warnings not found" }
        }
      }

      return {
        status: 200,
        response: warnings
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all warnings ${error.message}` }
      }
    }
  }

  async create(body: object): Promise<IResponse> {
    try {
      await warningService.warningService().create(body);

      return {
        status: 201,
        response: { message: "Warning was successfully created" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to create warning ${error.message}` }
      }
    }
  }

  async getWarning(id: string): Promise<IResponse> {
    try {
      const warning = await warningService.warningService().getWarning(id);

      if (!warning) {
        return {
          status: 404,
          response: { message: "Warning not found" }
        }
      }

      return {
        status: 200,
        response: warning
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch warning ${error.message}` }
      }
    }
  }

  async updateWarning(id: string, body: object): Promise<IResponse> {
    try {
      await warningService.warningService().updateWarning(id, body);

      return {
        status: 200,
        response: { message: "Warning was successfully updated" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to update warning ${error.message}` }
      }
    }
  }

  async deleteWarning(id: string): Promise<IResponse> {
    try {
      const warning = await warningService.warningService().getWarning(id);

      if (!warning) {
        return {
          status: 404,
          response: { message: "Warning not found" }
        }
      }

      await warningService.warningService().deleteWarning(warning);

      return {
        status: 200,
        response: { message: "Warning was deleted successfully" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to delete warning ${error.message}` }
      }
    }
  }
}
