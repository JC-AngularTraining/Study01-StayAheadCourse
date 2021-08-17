import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Booking } from '../booking.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-new',
  templateUrl: './booking-new.component.html',
  styleUrls: ['./booking-new.component.css']
})
export class BookingNewComponent implements OnInit {

  newBooking: Booking = {id: 0, startDate: null, endDate: null, customer: '', coop: ''};
  formGroup: FormGroup = new FormGroup({
    'startDate': new FormControl('', Validators.required),
    'endDate': new FormControl('', Validators.required),
    'customer': new FormControl('', Validators.required),
    'coop': new FormControl('', Validators.required)
  });

  constructor(private bookingService: BookingService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.formGroup.valid) {
      const newBooking = this.formGroup.value;
      this.bookingService.addNewBooking(newBooking).subscribe();
      this.formGroup.reset();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
