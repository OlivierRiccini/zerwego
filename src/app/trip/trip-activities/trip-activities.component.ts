import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trip-activities',
  templateUrl: './trip-activities.component.html',
  styleUrls: ['./trip-activities.component.scss']
})
export class TripActivitiesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          console.log(params)
      });
  }

}
