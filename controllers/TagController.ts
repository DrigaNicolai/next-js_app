import { IResponse } from "@ts/interface/global";
import tagService from "@services/index";
import tagApplicationService from "@services";

export default class TagController {
  async getAllTags(): Promise<IResponse> {
    try {
      const tags = await tagService.tagService().getAllTags();

      if (!tags) {
        return {
          status: 404,
          response: { message: "Tags not found" }
        }
      }

      return {
        status: 200,
        response: tags
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all tags ${error.message}` }
      }
    }
  }

  async create(body: object): Promise<IResponse> {
    try {
      await tagService.tagService().create(body);

      return {
        status: 201,
        response: { message: "Tag was successfully created" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to create tag ${error.message}` }
      }
    }
  }
  async getTag(id: string): Promise<IResponse> {
    try {
      const tag = await tagService.tagService().getTag(id);

      if (!tag) {
        return {
          status: 404,
          response: { message: "Tag not found" }
        }
      }

      return {
        status: 200,
        response: tag
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch tag ${error.message}` }
      }
    }
  }

  async updateTag(id: string, body: object): Promise<IResponse> {
    try {
      await tagService.tagService().updateTag(id, body);

      return {
        status: 200,
        response: { message: "Tag was successfully updated" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to update tag ${error.message}` }
      }
    }
  }

  async deleteTag(id: string): Promise<IResponse> {
    try {
      const tag = await tagService.tagService().getTag(id);

      if (!tag) {
        return {
          status: 404,
          response: { message: "Tag not found" }
        }
      }

      await tagService.tagService().deleteTag(tag);

      return {
        status: 200,
        response: { message: "Tag was deleted successfully" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to delete tag ${error.message}` }
      }
    }
  }

  async createFromApplication(body: object | any): Promise<IResponse> {
    try {
      const tagApplication = await tagApplicationService.tagApplicationService().getTagApplication(body.application_id);

      if (!tagApplication) {
        return {
          status: 404,
          response: { message: "Tag application not found" }
        }
      }

      await tagApplicationService.tagApplicationService().deleteTagApplication(tagApplication);

      await tagService.tagService().create({
        name: body.name,
        description: body.description
      });

      return  {
        status: 200,
        response: { message: "Tag was successfully created from application" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to create tag from application ${error.message}` }
      }
    }
  }
}
