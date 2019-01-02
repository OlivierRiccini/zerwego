import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  @Input() listOfTrips: ITrip[];
  // @Input() activeTripId: string;
  public activeTripId: string = null;

  constructor(public tripService: TripService, private route: ActivatedRoute) { }

  ngOnInit() { 
  };

  activateItem(tripId) {
    this.activeTripId = tripId;
  }

}
