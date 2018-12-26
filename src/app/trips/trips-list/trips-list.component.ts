import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  @Input() listOfTrips: ITrip[];

  constructor(public tripService: TripService) { }

  ngOnInit() { }

}
