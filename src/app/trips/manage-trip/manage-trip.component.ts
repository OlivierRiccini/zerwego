import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Trip } from '../../models/trip.model';
import { TripService } from '../../services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';

@Component({
  selector: 'app-manage-trip',
  templateUrl: './manage-trip.component.html',
  styleUrls: ['./manage-trip.component.scss']
})
export class ManageTripComponent implements OnInit {
  trip: ITrip;
  id: string;

  constructor(private tripService: TripService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.initTrip(this.id);
        }
      );
  }

  initTrip(id: string) {
    this.tripService.loadTrip(this.id).subscribe(
      response => this.trip = response,
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );
  }

}
