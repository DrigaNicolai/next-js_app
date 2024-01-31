import statisticController from "@controllers/index";

export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await statisticController.statisticController().getProfileStatistics(params.id);

  return new Response(JSON.stringify(response), { status });
}
