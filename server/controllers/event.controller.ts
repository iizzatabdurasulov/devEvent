import type { NextFunction, Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const bookEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const { email } = req.body as { email: string };

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Email allaqachon booking qilganmi?
    if (event.bookedEmails.includes(email)) {
      return res.status(400).json({
        message: "This email has already booked a spot",
      });
    }

    // Email qo'shib, spots oshiramiz
    event.bookedEmails.push(email);
    event.bookedSpots = (event.bookedSpots || 0) + 1;
    await event.save();

    res.json(event);
  } catch (error) {
    next(error);
  }
};
