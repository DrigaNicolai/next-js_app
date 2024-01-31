import warningTypeController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await warningTypeController.warningTypeController().getAllWarningTypes();

  return new Response(JSON.stringify(response), { status });
}
