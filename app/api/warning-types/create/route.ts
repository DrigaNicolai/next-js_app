import warningTypeController from "@controllers/index";

export const POST = async (req, res): Promise<Response> => {
  const warningType = await req.json();
  const { status, response } = await warningTypeController.warningTypeController().create(warningType);

  return new Response(JSON.stringify(response), { status });
}
