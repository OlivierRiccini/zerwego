import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit, OnDestroy {
  listOfTrips: ITrip[];

  private subscriptions: Subscription[] = [];
  public activeTripId: string = null;

  constructor(private route: ActivatedRoute, public tripService: TripService) { }

  ngOnInit() {
    this.loadTrips();
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
  
  loadTrips() {
    this.subscriptions.push(this.tripService.getTrips().subscribe(
      (response) => {
        if (response.length > 0) {
          this.listOfTrips = response;
          this.tripService.trips = response;
          this.activeTripId = this.listOfTrips[0].id;
        } else {
          console.log('No trip found');
        }
      },
      (err) => console.log(err)
    ));

   
  }

}
