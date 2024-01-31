import tagApplicationController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await tagApplicationController.tagApplicationController().getAll();

  return new Response(JSON.stringify(response), { status });
}
