import mongoose from "mongoose";
import Event from "../models/Event";
import { events } from "../libs/constants";

const seedEvents = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://izzatillabdurasulovv_db_user:1OsQbaW5mbTVbKVN@cluster0.bqx9kjt.mongodb.net/devEvents?appName=Cluster0",
    );
    console.log("Connected to mongodb");

    await Event.deleteMany({});
    console.log("Deleted old events");

    await Event.insertMany(events);
    console.log(` ${events.length} events added successfully`);

    process.exit(0);
  } catch (error) {
    console.error(" Error:", error);
    process.exit(1);
  }
};

seedEvents();
