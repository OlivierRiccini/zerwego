import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../../../services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';

@Component({
  selector: 'app-my-trips-list',
  templateUrl: './my-trips-list.component.html',
  styleUrls: ['./my-trips-list.component.scss']
})
export class MyTripsListComponent implements OnInit {
  @Input() listOfTrips: ITrip[];

  constructor(public tripService: TripService) { }

  ngOnInit() { }

}
