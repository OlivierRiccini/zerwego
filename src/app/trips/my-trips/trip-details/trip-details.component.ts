import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Trip } from 'src/app/models/trip.model';
import { TripService } from '../../../services/trip.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  trip: Trip;
  id: number;

  constructor(private tripService: TripService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.trip = this.tripService.getTrip(this.id);
        }
      );
  }

  // onChange(id) {
  //   this.trip = this.tripService.getTrip(id);
  // }

}
