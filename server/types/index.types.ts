import type { Document } from "mongoose";

export interface IEventDetail {
  id: number;
  value: string;
}

export interface IAgendaItem {
  id: number;
  time: string;
  title: string;
}

export interface IEvent extends Document {
  title: string;
  location: string;
  date: string;
  time: string;
  images: string[];
  desc: string;
  overview: string;
  eventDetails: IEventDetail[];
  agenda: IAgendaItem[];
  aboutOrganizer: string;
  tags: string[];
  bookedSpots: number
    bookedEmails: string[]; 

}
