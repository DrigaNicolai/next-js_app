import warningTypeController from "@controllers";

export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await warningTypeController.warningTypeController().getWarningType(params.id);

  return new Response(JSON.stringify(response), { status });
}

export const PATCH = async (req, { params }): Promise<Response> => {
  const warningType = await req.json();
  const { status, response } = await warningTypeController
    .warningTypeController()
    .updateWarningType(params.id, warningType);

  return new Response(JSON.stringify(response), { status });
}

export const DELETE = async (req, { params }): Promise<Response> => {
  const { status, response } = await warningTypeController
    .warningTypeController()
    .deleteWarningType(params.id);

  return new Response(JSON.stringify(response), { status });
}
