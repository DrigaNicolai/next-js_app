import warningController from "@controllers";

export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await warningController.warningController().getWarning(params.id);

  return new Response(JSON.stringify(response), { status });
}

export const PATCH = async (req, { params }): Promise<Response> => {
  const post = await req.json();
  const { status, response } = await warningController.warningController().updateWarning(params.id, post);

  return new Response(JSON.stringify(response), { status });
}

export const DELETE =  async (req, { params }): Promise<Response> => {
  const { status, response } = await warningController.warningController().deleteWarning(params.id);

  return new Response(JSON.stringify(response), { status });
}
