import { BookingStatus } from "./enums/room-type";
import { Room } from "./post";

export interface BookedRoom extends Room {
    bookingId: number;
    bookingStatus: BookingStatus
  }