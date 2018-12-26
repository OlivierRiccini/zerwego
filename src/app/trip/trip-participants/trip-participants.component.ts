import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-participants',
  templateUrl: './trip-participants.component.html',
  styleUrls: ['./trip-participants.component.scss']
})
export class TripParticipantsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
