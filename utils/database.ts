import mongoose, {Connection} from "mongoose";

let isConnected = false as boolean; // track the connection

export const connectToDB = async (): Promise<void | Response> => {
  mongoose.set('strictQuery', true);
  mongoose.set('bufferCommands', false); // Disable warning messages in console when is running on

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    return new Response(`Internal server error ${JSON.stringify(error)}`, { status: 500 });
  }
}
