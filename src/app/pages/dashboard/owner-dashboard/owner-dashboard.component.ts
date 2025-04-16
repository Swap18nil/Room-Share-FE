import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/common-classes/post';
import { RoomsService } from '../../rooms/rooms.service';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss']
})
export class OwnerDashboardComponent {
 rooms: Room[] = []; // or: any[] = [];

constructor(private router: Router,
              private roomsService: RoomsService
  ) { }

  ngOnInit(): void { 
    this.roomsService.getOwnerPost(Number(localStorage.getItem('userId'))).subscribe({
      next: (data) => {
        this.rooms = data;
        console.log('Fetched bookings:', data);
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
 
  }
  goToAddListing(): void {
    this.router.navigate(['/add-listing',]);  // Navigate to the add room listing page
  }
  editPost(roomId:number): void{
    this.router.navigate(['/add-listing',roomId]);
  }
}