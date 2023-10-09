import tagController from "@controllers/index";

export const POST = async (req, res): Promise<Response> => {
  const tag = await req.json();
  const { status, response } = await tagController.tagController().create(tag);

  return new Response(JSON.stringify(response), { status });
}
