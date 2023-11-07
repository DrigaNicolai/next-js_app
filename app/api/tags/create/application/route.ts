import tagController from "@controllers";

export const POST = async (req, res): Promise<Response> => {
  const tag = await req.json();
  const { status, response } = await tagController.tagController().createFromApplication(tag);

  return new Response(JSON.stringify(response), { status });
}
