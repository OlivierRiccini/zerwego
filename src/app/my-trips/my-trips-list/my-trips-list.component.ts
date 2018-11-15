import { Component, OnInit } from '@angular/core';
import { TripService } from '../../shared/services/trip.service';
import { Trip } from '../../shared/models/trip.model';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-trips-list',
  templateUrl: './my-trips-list.component.html',
  styleUrls: ['./my-trips-list.component.scss']
})
export class MyTripsListComponent implements OnInit {
  trips: Trip[];
  // subscription: Subscription;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    // this.subscription = this.tripService.tripsChanged
    //   .subscribe(
    //     (trips: Trip[]) => {
    //       this.trips = trips;
    //     }
    //   );
    this.trips = this.tripService.getTrips();
    console.log(this.trips);
  }

}
