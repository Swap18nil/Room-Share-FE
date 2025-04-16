import { Component } from '@angular/core';
import { RoomsService } from '../../rooms/rooms.service';
import { BookedRoom } from 'src/app/common-classes/bookedRooms';

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.scss']
})
export class BookingRequestComponent {
  bookings: any[] = [];
  loading = true;

  constructor(private bookingService: RoomsService) {}

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.bookingService.getBookingDetails().subscribe({
      next: (res) => {
        this.bookings = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching bookings', err);
        this.loading = false;
      }
    });
  }

  handleAction(bookingId: number, newStatus: string) {
    this.bookingService.updateBookingStatus(bookingId, newStatus).subscribe({
      next: () => {
        this.bookings = this.bookings.map(b => {
          if (b.bookingId === bookingId) {
            return { ...b, bookingStatus: newStatus };
          }
          return b;
        });
      },
      error: (err) => {
        console.error('Error updating status', err);
      }
    });
  }
}
