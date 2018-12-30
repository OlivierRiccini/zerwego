import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trip-participants',
  templateUrl: './trip-participants.component.html',
  styleUrls: ['./trip-participants.component.scss']
})
export class TripParticipantsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          console.log(params)
      });
  }

}
