import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  trip: Trip;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.trip = this.tripService.getTrip(1);
  }

  // onChange(id) {
  //   this.trip = this.tripService.getTrip(id);
  // }

}
