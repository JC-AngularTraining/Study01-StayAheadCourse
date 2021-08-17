import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-count',
  templateUrl: './booking-count.component.html',
  styleUrls: ['./booking-count.component.css']
})
export class BookingCountComponent implements OnInit {

  count: number = 0;

  constructor(private bookingService: BookingService) {
   this.bookingService.getBookingCount().subscribe(count => this.count = count); 
  }

  ngOnInit() {}

}
