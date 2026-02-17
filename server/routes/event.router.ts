import express from "express";
import {
  createEvent,
  getEvents,
  getEventsById,
  updateEvent,
  deleteEvent,
  bookEvent,
} from "../controllers/event.controller";

const router = express.Router();

// GET all events
router.get("/events", getEvents);

// GET event by id
router.get("/events/:id", getEventsById);

// CREATE event
router.post("/events", createEvent);

// UPDATE event
router.put("/events/:id", updateEvent);

// DELETE event
router.delete("/events/:id", deleteEvent);

// BOOK event
router.post("/events/:id/book", bookEvent);

export default router;
