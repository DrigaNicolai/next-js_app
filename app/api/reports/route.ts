import reportController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await reportController.reportController().getAllReports();

  return new Response(JSON.stringify(response), { status });
}
