import warningController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await warningController.warningController().getAllWarnings();

  return new Response(JSON.stringify(response), { status });
}
