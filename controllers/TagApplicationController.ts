import { IResponse } from "@ts/interface/global";
import tagApplicationService from "@services/index";

export default class TagApplicationController {
  async getAll(): Promise<IResponse> {
    try {
      const tagApplications = await tagApplicationService.tagApplicationService().getAll();

      if (!tagApplications) {
        return {
          status: 404,
          response: { message: "Tag applications not found" }
        }
      }

      return {
        status: 200,
        response: tagApplications
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all tag applications ${error.message}` }
      }
    }
  }

  async create(body: object): Promise<IResponse> {
    try {
      await tagApplicationService.tagApplicationService().create(body);

      return {
        status: 201,
        response: { message: `Tag application was successfully created` }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to create tag application ${error.message}` }
      }
    }
  }

  async deleteTagApplication(id: string): Promise<IResponse> {
    try {
      const tagApplication = await tagApplicationService.tagApplicationService().getTagApplication(id);

      if (!tagApplication) {
        return {
          status: 404,
          response: { message: "Tag application not found" }
        }
      }

      await tagApplicationService.tagApplicationService().deleteTagApplication(tagApplication);

      return  {
        status: 200,
        response: { message: "Tag application was deleted successfully" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to delete tag application ${error.message}` }
      }
    }
  }
}
