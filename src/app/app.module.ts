import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingNewComponent } from './booking-new/booking-new.component';
import { BookingService } from './booking.service';
import { BookingCountComponent } from './booking-count/booking-count.component';
import { uiStateReducer } from './redux';

const routes: Routes = [
  { path: '', component: BookingListComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'newbooking', component: BookingNewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BookingListComponent,
    BookingNewComponent,
    BookingCountComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({uiState: uiStateReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
