import { connectToDB } from "@utils/database";
import Report from "@models/report";

export const GET = async (req) => {
  try {
    await connectToDB();

    const reports = await Report.find({}).populate("victim");

    return new Response(JSON.stringify(reports), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all reports", { status: 500 });
  }
}

export const DELETE = async (req, { query }) => {
  try {
    await connectToDB();

    const { prompt } = req.query;

    console.log(prompt);

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const deletedReport = await Report.deleteOne({ prompt });

    if (!deletedReport) {
      return new Response("Report not found", { status: 404 });
    }

    return new Response("Connected report was successfully deleted", { status: 200 });
  } catch (error) {
    return new Response("Error Deleting Prompt", { status: 500 });
  }
}