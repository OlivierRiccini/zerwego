import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trip-calendar',
  templateUrl: './trip-calendar.component.html',
  styleUrls: ['./trip-calendar.component.scss']
})
export class TripCalendarComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          console.log(params)
      });
  }

}
