import tagApplicationController from "@controllers/index";

export const POST = async (req, res): Promise<Response> => {
  const tagApplication = await req.json();
  const { status, response } = await tagApplicationController.tagApplicationController().create(tagApplication);

  return new Response(JSON.stringify(response), { status });
}
