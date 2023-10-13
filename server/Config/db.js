// Import the 'mongoose' library for MongoDB interaction.
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const connectDB = async () => {
  try {
    // Configure Mongoose to enable strict mode for queries.
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true, // Parse connection string using new URL parser.
      useUnifiedTopology: true, // Use new server discovery and monitoring engine.
    });

    console.log(`MongoDB Connected :  ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
