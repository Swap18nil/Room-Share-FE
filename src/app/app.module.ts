import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { RoomListComponent } from './pages/rooms/room-list/room-list.component';
import { RoomDetailComponent } from './pages/rooms/room-detail/room-detail.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { OwnerDashboardComponent } from './pages/dashboard/owner-dashboard/owner-dashboard.component';
import { TenantDashboardComponent } from './pages/dashboard/tenant-dashboard/tenant-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AddRoomComponent } from './pages/rooms/add-room/add-room.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorHttpService } from 'src/interceptors/interceptor-http.service';
import { RoomsService } from './pages/rooms/rooms.service';
import { AuthService } from './common-services/auth.service';
import { BookingRequestComponent } from './pages/bookings/booking-request/booking-request.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RoomListComponent,
    RoomDetailComponent,
    BookingsComponent,
    OwnerDashboardComponent,
    TenantDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    AddRoomComponent,
    BookingRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpService, multi: true },
    RoomsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
