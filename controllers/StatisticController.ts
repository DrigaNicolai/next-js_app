import { IResponse } from "@ts/interface/global";
import userService from "@services";
import postService from "@services";
import warningService from "@services";

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

  async getProfileStatistics(id: string): Promise<IResponse> {
    try {
      const total_posts = await postService.postService().getTotalUserPosts(id);

      if (!total_posts) {
        return {
          status: 422,
          response: { message: "User's posts can not be counted" }
        }
      }

      const [favorite_tag] = await userService.userService().getUserFrequentTags(id,1);

      if (!favorite_tag) {
        return {
          status: 422,
          response: { message: "User's frequent tags can not be found" }
        }
      }

      const [warning_points] = await warningService.warningService().getUserWarningPoints(id);

      if (!warning_points) {
        return {
          status: 422,
          response: { message: "User's warning point can not be calculated" }
        }
      }

      return  {
        status: 200,
        response: { total_posts, favorite_tag, warning_points }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch statistics ${error.message}` }
      }
    }
  }
}
