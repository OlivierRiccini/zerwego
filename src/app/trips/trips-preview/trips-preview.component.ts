import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Trip } from 'src/app/models/trip.model';
import { TripService } from '../../services/trip.service';
import { TripsListComponent } from '../trips-list/trips-list.component';
import { ITrip } from 'src/app/interfaces/trip.interface';

@Component({
  selector: 'app-trips-preview',
  templateUrl: './trips-preview.component.html',
  styleUrls: ['./trips-preview.component.scss']
})
export class TripsPreviewComponent implements OnInit {
  trip: ITrip;
  id: string;

  constructor(
    private tripService: TripService,          
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

  deleteTrip() {
    this.tripService.removeFromService(this.id);
    this.tripService.deleteTrip(this.id).subscribe(
      () => {
        console.log('Trip deleted with succes!');
        this.router.navigate(['/trips']);
      },
      err => console.log(err)
    );
  }
  
}