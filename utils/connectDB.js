import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Check if there is an existing database connection
    if (mongoose.connections[0].readyState) {
      console.log("Already connected");
      return; // Return the existing connection if already connected
    }

    // Disable strict query mode (for compatibility with Mongoose versions)
    mongoose.set("strictQuery", false);

    // Connect to the database using the MONGO_URI environment variable
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB"); // Log success
  } catch (error) {
    // Handle connection errors and log the message
    console.error("Error connecting to the database:", error.message);
    throw new Error("Database connection failed"); // Throw an error if the connection fails
  }
};

export default connectDB;
