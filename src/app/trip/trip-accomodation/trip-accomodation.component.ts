import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trip-accomodation',
  templateUrl: './trip-accomodation.component.html',
  styleUrls: ['./trip-accomodation.component.scss']
})
export class TripAccomodationComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          console.log(params)
      });
  }

}
