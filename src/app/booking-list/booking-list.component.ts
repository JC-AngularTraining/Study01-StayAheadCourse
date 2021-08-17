import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { Store } from '@ngrx/store';
import { ActionTypes } from '../redux';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: Array<Booking> = [];
  sortProp: string;
  sortOrder: string;

  constructor(private bookingService: BookingService, private store: Store<any>) {
    this.bookingService.getAllBookings().subscribe(bookings => {
      this.bookings = bookings.map(booking => ({
        ...booking,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate)
      }));
      this.store.select('uiState').subscribe(state => {
        this.sortProp = state[this.constructor.name].sortProp;
        this.sortOrder = state[this.constructor.name].sortOrder;
        if (this.sortOrder == 'asc') {
          this.sortByAsc(this.sortProp);
        } else {
          this.sortByDesc(this.sortProp);
        }
      });
      
    });
  }

  ngOnInit() {}

  sortBy(prop: string) {
    if (this.sortProp == prop) {
      if (this.sortOrder == 'asc') {
        this.sortByDesc(prop);
        this.sortOrder = 'desc';
      } else {
        this.sortByAsc(prop);
        this.sortOrder = 'asc';
      }
    } else {
      this.sortByAsc(prop);
      this.sortOrder = 'asc';
      this.sortProp = prop;
    }
    this.store.dispatch({
      type: ActionTypes.CHANGE_UI_SETTINGS, 
      payload: {
        componentName: this.constructor.name,
        settings: {
          sortProp: this.sortProp,
          sortOrder: this.sortOrder
        }
      }
    });
  }

  sortByAsc(prop: string) {
    if (prop == 'customer' || prop == 'coop') {
      this.bookings.sort((b1: Booking, b2: Booking) => b1[prop].localeCompare(b2[prop]));
    } else {
      this.bookings.sort((b1: Booking, b2: Booking) => b1[prop] - b2[prop]);
    }
  }

  sortByDesc(prop: string) {
    if (prop == 'customer' || prop == 'coop') {
      this.bookings.sort((b1: Booking, b2: Booking) => b2[prop].localeCompare(b1[prop]));
    } else {
      this.bookings.sort((b1: Booking, b2: Booking) => b2[prop] - b1[prop]);
    }
  }

}
