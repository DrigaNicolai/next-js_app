import statisticController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await statisticController.statisticController().getGlobalStatistics();

  return new Response(JSON.stringify(response), { status });
}
