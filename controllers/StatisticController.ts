import { IResponse } from "@ts/interface/global";
import userService from "@services";
import postService from "@services";

export default class StatisticController {
  async getGlobalStatistics(): Promise<IResponse> {
    try {
      const total_users = await userService.userService().getTotalUsers();

      if (!total_users) {
        return {
          status: 422,
          response: { message: "Users can not be counted" }
        }
      }

      const total_posts = await postService.postService().getTotalPosts();

      if (!total_posts) {
        return {
          status: 422,
          response: { message: "Posts can not be counted" }
        }
      }

      const frequent_tags = await postService.postService().getFrequentTags(3);

      if (!frequent_tags) {
        return {
          status: 422,
          response: { message: "Frequent tags can not be counted" }
        }
      }

      return {
        status: 200,
        response: { total_users, total_posts, frequent_tags }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch statistics ${error.message}` }
      }
    }
  }
}
