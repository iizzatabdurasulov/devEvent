import { model, Schema } from "mongoose";
import type { IEvent } from "../types/index.types";

const eventDetailScheme = new Schema(
  {
    id: Number,
    value: String,
  },
  { _id: false },
);

const agendaSchema = new Schema(
  {
    id: Number,
    time: String,
    title: String,
  },
  { _id: false },
);

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  location: String,
  date: String,
  time: String,
  images: [String],
  desc:  String,
  overview: String,
  eventDetails: [eventDetailScheme],
  agenda: [agendaSchema],
  aboutOrganizer: String,
  tags: [String]
}, {timestamps: true});



export default model<IEvent>("Event", eventSchema)