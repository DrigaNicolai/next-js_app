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
    return new Response("Failed to fetch all reports", { status: 500 });
  }
}

export const DELETE =  async (req, { params }) => {
  try {
    await connectToDB();

    await Report.findByIdAndDelete(params.id);

    // await Report.deleteOne({ prompts: params.id });
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
}
