import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingService {

    bookings: Array<Booking>;
    url: string = 'http://localhost:3000/bookings';
    bookingCountSubject: Subject<number> = new Subject();

    constructor(private http: HttpClient) {
        
    }

    getAllBookings(): Observable<any> {
        if (this.bookings) {
            console.log('Getting all bookings from memory...');
            return of(this.bookings);
        } else {
            console.log('Getting all bookings from API...');
            const observable: Observable<any> =  this.http.get(this.url);
            observable.subscribe(bookings => { 
                this.bookings = bookings;
                this.bookingCountSubject.next(bookings.length);
            });
            return observable;
        }
    }

    addNewBooking(newBooking: Booking): Observable<any> {
        this.bookingCountSubject.next(++this.bookings.length);
        this.bookings = undefined;
        return this.http.post(this.url, newBooking);
    }

    getBookingCount(): Observable<number> {
        return this.bookingCountSubject.asObservable();
    }

}