import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { OwnerDashboardComponent } from './pages/dashboard/owner-dashboard/owner-dashboard.component';
import { TenantDashboardComponent } from './pages/dashboard/tenant-dashboard/tenant-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomDetailComponent } from './pages/rooms/room-detail/room-detail.component';
import { RoomListComponent } from './pages/rooms/room-list/room-list.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AddRoomComponent } from './pages/rooms/add-room/add-room.component';
import { BookingRequestComponent } from './pages/bookings/booking-request/booking-request.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Landing Page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rooms', component: RoomListComponent },  
  { path: 'rooms/:id', component: RoomDetailComponent },
  { path: 'bookings/:id', component: BookingsComponent },
  { path: 'owner-dashboard', component: OwnerDashboardComponent },
  { path: 'tenant-dashboard', component: TenantDashboardComponent },
  { path: 'add-listing', component: AddRoomComponent },
  { path: 'add-listing/:id', component: AddRoomComponent },
  { path: 'booking-request', component: BookingRequestComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirect unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
