import { connectToDB } from "@utils/database";
import Report from "@models/report";

export const GET = async (req) => {
  try {
    await connectToDB();

    const reports = await Report.find({}).populate("victim").populate("prompt");

    return new Response(JSON.stringify(reports), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all reports", { status: 500 });
  }
}

export const DELETE = async (req) => {
  const { prompt } = await req.body;

  try {
    await connectToDB();

    console.log(prompt, "prompt");
1
    // const promptId = query.prompt;

    /*if (!promptId) {
      return new Response("Prompt is required", { status: 400 });
    }*/
    // const reports = await Report.find({ prompt: prompt._id });

    // console.log(reports);

    /*if (!deletedReport) {
      return new Response("Report not found", { status: 404 });
    }*/

    return new Response("Connected report was successfully deleted", { status: 200 });
  } catch (error) {
    return new Response("Error Deleting connected report", { status: 500 });
  }
}
