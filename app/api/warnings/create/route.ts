import warningController from "@controllers/index";

export const POST = async (req, res): Promise<Response> => {
  const warning = await req.json();
  const { status, response } = await warningController.warningController().create(warning);

  return new Response(JSON.stringify(response), { status });
}
