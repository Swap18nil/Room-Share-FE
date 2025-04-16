import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent {
  roomId: number = 0;
  room: any;  // This would be fetched from an API in a real scenario
  constructor(private route: ActivatedRoute, private router: Router,
    private roomsServie: RoomsService
  )
  {
    
  }
  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.roomsServie.getRoomDetails(this.roomId).subscribe((room) => {
      if(room){
        room.images= this.normalizeImages(room.images)
      }
      console.log('Found room:', room);
      this.room = room
    });
  }

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

  bookRoom(): void {
    this.router.navigate(['/bookings',this.roomId]);
  }
}
