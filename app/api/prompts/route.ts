import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req): Promise<Response> => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("createdBy");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}