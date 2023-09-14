import { connectToDB } from "@utils/database";
import Report from "@models/report";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const report = await Report.findById(params.id).populate("creator");

    if (!report) {
      return new Response("Report not found", { status: 404 });
    }

    return new Response(JSON.stringify(report), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch report", { status: 500 });
  }
}

export const DELETE =  async (req, { params }) => {
  try {
    await connectToDB();

    const report = await Report.findById(params.id);

    if (!report) {
      return new Response("Report not found", { status: 404 });
    }

    await Report.deleteOne(report);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting report", { status: 500 });
  }
}
