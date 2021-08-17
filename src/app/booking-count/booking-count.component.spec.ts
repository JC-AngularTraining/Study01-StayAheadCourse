import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCountComponent } from './booking-count.component';

describe('BookingCountComponent', () => {
  let component: BookingCountComponent;
  let fixture: ComponentFixture<BookingCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
