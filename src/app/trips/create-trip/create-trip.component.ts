import { Component, OnInit, Input } from '@angular/core';
import { ITrip } from 'src/app/interfaces/trip.interface';
// import { ITripPreview } from 'src/app/interfaces/trip.interface';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  tripFormValues: ITrip;

  constructor() { }

  receiveDataFromTripForm($event) {
    this.tripFormValues = $event;
  }

  ngOnInit() {
  }

}
