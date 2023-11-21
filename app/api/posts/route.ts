import postController from "@controllers/index";

/**
 * @swagger
 * components:
 *   schemas:
 *     GetPostsSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           default: 654e03e9031c05cd0735971a
 *         createdBy:
 *           type: string
 *           default: 650726c9f37c7cc4ffbb3c9c
 *         title:
 *           type: string
 *           default: Prompt title
 *         text:
 *           type: string
 *           default: Prompt text
 *         tag_id:
 *           type: string
 *           default: 6530dad9b6c76ef93c09caf2
 *         createdAt:
 *           type: string
 *           default: 2023-11-21T10:11:12.824+00:00
 *         updatedAt:
 *           type: string
 *           default: 2023-11-21T10:11:12.824+00:00
 *         __v:
 *           type: integer
 *           default: 0
 * /api/posts:
 *   get:
 *     description: Returns all posts
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/GetPostsSchema'
 *       404:
 *         description: Posts not found
 * */
export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await postController.postController().getAllPosts();

  return new Response(JSON.stringify(response), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
