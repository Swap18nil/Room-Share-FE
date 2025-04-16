import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { BookedRoom } from 'src/app/common-classes/bookedRooms';
import { Room } from 'src/app/common-classes/post';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomList: BehaviorSubject<Room[] | null> = new BehaviorSubject<Room[] | null>(null);
  constructor(
    private _httpClient: HttpClient,
  ) { }

  get roomList$(): Observable<Room[] | null> {
    return this.roomList.asObservable();
  }


  getRooms(): Observable<Room[]>{
    const url = `rooms?timestamp=${new Date().getTime()}`;
    return this._httpClient.get<Room[]>(url).pipe(
      tap((response) => {
        this.roomList.next(response);
      }))
  }

  addRoom(room : Room, selectedFiles: any){
    const url = `rooms?timestamp=${new Date().getTime()}`;
    // this.rooms.push(room);
    // let params = new HttpParams();
    // params = params.append('room', JSON.stringify(room));

    const formData = new FormData();

    // Append room details to formData
    formData.append('title', room.title);
    formData.append('description', room.description);
    formData.append('address', room.address);
    formData.append('city', room.city);
    formData.append('type', room.type);
    formData.append('price', room.price.toString());
    formData.append('preference', room.preference);
    formData.append('ber', room.ber);
    formData.append('userId', room.userId.toString());

    // Append selected images to formData
    // for (let i = 0; i < selectedFiles.length; i++) {
    if(selectedFiles){
      formData.append('images', selectedFiles, selectedFiles.name);
    // }
    }

    return new Promise((resolve, reject) => {
      this._httpClient.post(url, formData).subscribe((response: any) => {
        console.log(response,"test")
        resolve(response);
      }, reject);
    });

  }

  updateRoom(room : Room){
    const url = `rooms/${room.id}?timestamp=${new Date().getTime()}`;
    // this.rooms.push(room);
    let params = new HttpParams();
    params = params.append('room', JSON.stringify(room));

    return new Promise((resolve, reject) => {
      this._httpClient.put(url, room).subscribe((response: any) => {
        console.log(response,"test")
        resolve(response);
      }, reject);
    });

  }

  getRoomDetails(roomId: number): Observable<Room | undefined> {
    return this.roomList$.pipe(
      tap((rooms) => console.log('Rooms:', rooms)),
      map((rooms) => {
        console.log('Looking for room with ID:', roomId);
        console.log('Room IDs in list:', rooms?.map(r => r.id));
        return rooms?.find(room => +room.id === +roomId);  // using + to coerce types
      })
    );
  }

  addBooking(booking:any){
    const url = `bookings?timestamp=${new Date().getTime()}`;
    return new Promise((resolve, reject) => {
      this._httpClient.post(url, booking).subscribe((response: any) => {
        console.log(response,"teBooking Succesful")
        resolve(response);
      }, reject);
    });
  }

  getBookedRooms(userId: number): Observable<BookedRoom[]> {
    const url = `bookings/${userId}`;
    return this._httpClient.get<BookedRoom[]>(url).pipe(
      tap((rooms) => {
        console.log('Booked Rooms with bookingId:', rooms);
      })
    );
  }

  deleteBooking(bookingId: number): Observable<any> {
    const url = `bookings/${bookingId}`;
    // const url = `bookings/${bookingId}`;
    return this._httpClient.delete(url);
  }

  getOwnerPost(userId: number):Observable<Room[]>{
    const url = `ownerPost/${userId}`;
    return this._httpClient.get<Room[]>(url).pipe(
      tap((rooms) => {
        console.log('Booked Rooms with bookingId:', rooms);
      })
    );
  } 

  getBookingDetails():Observable<any[]>{
    const url = `bookingRequests/${2}`;
    return this._httpClient.get<any[]>(url).pipe(
      tap((rooms) => {
        console.log('Booked Rooms with bookingId:', rooms);
      })
    );

  }

  updateBookingStatus(bookingId: number, bookingStatus: string) {
    const url = `bookingRequests/${bookingId}`;
    return this._httpClient.put(url, { bookingStatus });
  }

}

