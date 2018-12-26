import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  listOfTrips: ITrip[];

  constructor(private route: ActivatedRoute, public tripService: TripService) { }


  ngOnInit() {
    this.loadTrips();
  }
  
  loadTrips() {
    this.tripService.getTrips().subscribe(
      (response) => {
        this.listOfTrips = response;
        this.tripService.trips = response;
      },
      (err) => console.log(err)
    );
  }

}
