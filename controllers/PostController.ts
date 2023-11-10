import { IResponse } from "@ts/interface/global";
import postService from "@services/index";

export default class PostController {
  async getAllPosts(): Promise<IResponse> {
    try {
      const posts = await postService.postService().getAllPosts();

      if (!posts) {
        return {
          status: 404,
          response: { message: "Posts not found" }
        }
      }

      return {
        status: 200,
        response: posts
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all posts ${error.message}` }
      }
    }
  }

  async create(body: object): Promise<IResponse> {
    try {
      await postService.postService().create(body);

      return {
        status: 201,
        response: { message: "Post was successfully created" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to create post ${error.message}` }
      }
    }
  }

  async getPost(id: string): Promise<IResponse> {
    try {
      const post = await postService.postService().getPost(id);

      if (!post) {
        return {
          status: 404,
          response: { message: "Post not found" }
        }
      }

      return {
        status: 200,
        response: post
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch post ${error.message}` }
      }
    }
  }

  async updatePost(id: string, body: object): Promise<IResponse> {
    try {
      await postService.postService().updatePost(id, body);

      return {
        status: 200,
        response: { message: "Post was successfully updated" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to update post ${error.message}` }
      }
    }
  }

  async deletePost(id: string): Promise<IResponse> {
    try {
      const post = await postService.postService().getPost(id);

      if (!post) {
        return {
          status: 404,
          response: { message: "Post not found" }
        }
      }

      await postService.postService().deletePost(post);

      return {
        status: 200,
        response: { message: "Post was deleted successfully" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to delete post ${error.message}` }
      }
    }
  }
}
