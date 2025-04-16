import { Component } from '@angular/core';
import { RoomsService } from '../../rooms/rooms.service';
import { BookedRoom } from 'src/app/common-classes/bookedRooms';

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.scss']
})
export class TenantDashboardComponent {
  bookedRooms: BookedRoom[] = []; // or: any[] = [];
  constructor(private roomsService: RoomsService) {}
  ngOnInit() {
    this.getUserBookings();
  }

  getUserBookings() {
    this.roomsService.getBookedRooms(Number(localStorage.getItem('userId'))).subscribe({
      next: (data) => {
        this.bookedRooms = data;
        console.log('Fetched bookings:', data);
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }

  cancelBooking(bookingId:any):void{
    this.roomsService.deleteBooking(bookingId).subscribe({
      next: (response) => {
        console.log('Booking deleted:', response);
        // Refresh bookings after delete
        this.getUserBookings();
      },
      error: (err) => {
        console.error('Failed to delete booking:', err);
      }
    });
  }
}
