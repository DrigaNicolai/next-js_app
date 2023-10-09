import tagController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await tagController.tagController().getAllTags();

  return new Response(JSON.stringify(response), { status });
}