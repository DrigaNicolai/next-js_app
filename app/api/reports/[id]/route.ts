import reportController from "@controllers/index";

export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await reportController.reportController().getReport(params.id);

  return new Response(JSON.stringify(response), { status });
}

export const DELETE =  async (req, { params }): Promise<Response> => {
  const { status, response } = await reportController.reportController().deleteReport(params.id);

  return new Response(JSON.stringify(response), { status });
}
