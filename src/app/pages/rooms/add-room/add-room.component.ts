import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/common-classes/post';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {
  room = new Room();
  selectedFile: File | null = null;
  previewImage: string | null = null;
  roomId :number =0
  constructor(private router: Router,
              private roomsService: RoomsService,
              private activatedRoute: ActivatedRoute
  ) {
    console.log("add room component")
  }

  ngOnInit(): void { 
    this.roomId = Number(this.activatedRoute.snapshot.paramMap.get('id')); // 👈 Get roomId from route
    if(this.roomId){
      console.log("inside")
      this.roomsService.getOwnerPost(Number(localStorage.getItem('userId'))).subscribe({
        next: (data) => {
          const selectedRoom = data.find((room: Room) => room.id === this.roomId); // 👈 Filter it
      
          if (selectedRoom) {
            this.room = selectedRoom;
          } else {
            console.error('Room not found for ID:', this.roomId);
          }
      
          console.log('Fetched rooms:', data);
        },
        error: (err) => {
          console.error('Error fetching rooms:', err);
        }
      });
    }
 
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      // Preview image before upload
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
    }
  }

  onSubmit(): void {
    // Normally you would send this data to your backend API
    console.log('Room listing added:', this.room);
    // After submission, redirect the user to the Owner Dashboard or Room List page
    this.room.userId = Number(localStorage.getItem('userId'));
    if(this.roomId){
      this.roomsService.updateRoom(this.room);
    }else{
    this.roomsService.addRoom(this.room,this.selectedFile);
  }
    this.router.navigate(['/rooms']);
    
  }
}
