import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  imageUrl: string = "test";

  constructor() { }

  receiveImageUrl($event) {
    this.imageUrl = $event;
  }

  ngOnInit() {
  }

}
