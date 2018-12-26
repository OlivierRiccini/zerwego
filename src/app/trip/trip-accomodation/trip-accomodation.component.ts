import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-accomodation',
  templateUrl: './trip-accomodation.component.html',
  styleUrls: ['./trip-accomodation.component.scss']
})
export class TripAccomodationComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
