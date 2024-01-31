import reportController from "@controllers/index";

export const POST = async (req, res): Promise<Response> => {
  const report = await req.json();
  const { status, response } = await reportController.reportController().create(report);

  return new Response(JSON.stringify(response), { status });
}
