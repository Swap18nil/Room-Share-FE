import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../rooms/rooms.service';

@Component({
  selector: 'app-booking',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  room: any;
  roomId: number = 0;
  booking: any = { fullName: '', emailAddress: '', phoneNumber: '', specialRequests: '' };

  constructor(private route: ActivatedRoute,private roomsServie: RoomsService) {}

  ngOnInit(): void {
    // Fetch the room details using the roomId
    // this.room = {
    //   id: roomId,
    //   title: 'Spacious 2 Bedroom Apartment',
    //   description: 'A spacious 2-bedroom apartment in the city center.',
    //   price: 1200,
    //   images: ['https://via.placeholder.com/200x150']
    // };
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.roomsServie.getRoomDetails(this.roomId).subscribe((room) => {
      console.log('Found room:', room);
      this.room = room
    });
  }

  onSubmit(): void {
    this.booking['userId'] =  Number(localStorage.getItem('userId'));
    this.booking['roomId'] = this.roomId;
    console.log('Booking details:', this.booking);
    this.roomsServie.addBooking(this.booking)
    alert('Booking successful!');
  }
}
