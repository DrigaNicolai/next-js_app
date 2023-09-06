import { connectToDB } from "@utils/database";
import Report from "@models/report";

export const POST = async (req) => {
  const { promptId, userId, message } = await req.json();

  try {
    await connectToDB();

    const newReport = new Report({
      prompt: promptId,
      victim: userId,
      message
    });

    await newReport.save();

    return new Response(JSON.stringify(newReport), { status: 201 });
  } catch (error) {
    return new Response("Failed to send reports", { status: 500 });
  }
}
