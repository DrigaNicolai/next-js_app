import { connectToDB } from "@utils/database";
import Report from "@models/report";

export const GET = async (req): Promise<Response> => {
  try {
    await connectToDB();

    const reports = await Report.find({}).populate("victim_id").populate("prompt_id");

    return new Response(JSON.stringify(reports), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all reports", { status: 500 });
  }
}
