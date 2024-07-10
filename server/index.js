import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import taskroute from "./routes/taskRoute.js";

// Load environment variables
dotenv.config();

// Verify environment variables
//console.log("PORT:", process.env.PORT); // Should log: 8000
//console.log("MONGO_URL:", process.env.MONGO_URL); // Should log the MongoDB URI

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://mern-stack-todo-app-frontend-tau.vercel.app"],
    // origin: ["http://localhost:8000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
//app.use(cors())

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Database connection
mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
    process.exit(1); // Exit the process with failure
  });

// Routes
app.use("/api", taskroute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
