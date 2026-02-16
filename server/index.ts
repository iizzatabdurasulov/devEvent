import express from "express";
import router from "./routes/event.router";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadRouter from "./routes/upload.router";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", router);
app.use("/api", uploadRouter);

const mongoUri = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 5000;

if (!mongoUri) {
  throw new Error("MONGO_DB_URI environment variable is not defined");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`App listening on ${PORT} from server side`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
