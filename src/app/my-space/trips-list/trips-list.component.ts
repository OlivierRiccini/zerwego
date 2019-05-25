import { Component, OnInit } from '@angular/core';
import { ITrip } from 'src/app/models/trip';
import { Subscription } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {

  public listOfTrips: ITrip[];

  private subscriptions: Subscription[] = [];

  constructor(public tripService: TripService) { }

  public ngOnInit() {
    this.loadTrips();
  }

  public ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
  
  private loadTrips() {
    this.subscriptions.push(this.tripService.getTrips().subscribe(
      (response) => {
        if (response.length > 0) {
          this.listOfTrips = response;
          this.tripService.trips = response;
        } else {
          console.log('No trip found');
        }
      },
      (err) => console.log('err= ' + err)
    ));

   
  }

}
