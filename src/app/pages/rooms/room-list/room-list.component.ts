import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {

  searchQuery: string = '';
  rooms: any[] = [];

  constructor(
    private router: Router,
    private roomsServie: RoomsService
  ) {}

  ngOnInit(): void {
    this.roomsServie.getRooms().subscribe();
    this.roomsServie.roomList$.subscribe((rooms) => {
      if(rooms){
        this.rooms = rooms.map(room => ({
          ...room,
          images: this.normalizeImages(room.images)
      }));}
    });
  }

  // Helper: Normalize image path array
  normalizeImages(images: string | string[]): string[] {
    let parsedImages: string[];

    // If images is a string (e.g. JSON stringified array), parse it
    if (typeof images === 'string') {
      try {
        parsedImages = JSON.parse(images);
      } catch {
        parsedImages = [];
      }
    } else {
      parsedImages = images;
    }

    // Convert Windows-style paths to asset-relative paths
    return parsedImages.map((path: string) => {
      const parts = path.split('src/');
      return parts.length > 1 ? parts[1] : path;
    });
  }

  // Getter: Filter rooms based on search
  get filteredRooms() {
    if (this.rooms) {
      return this.rooms.filter((room: any) =>
        room.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        room.city.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return [];
  }

  // Navigate to Room Details
  viewRoomDetails(roomId: number) {
    this.router.navigate(['/rooms', roomId]);
  }
}
