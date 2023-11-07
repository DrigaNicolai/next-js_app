import tagApplicationController from "@controllers/index";

export const DELETE = async (req, { params }): Promise<Response> => {
  const { status, response } = await tagApplicationController.tagApplicationController().deleteTagApplication(params.id);

  return new Response(JSON.stringify(response), { status });
}
