import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-transport',
  templateUrl: './trip-transport.component.html',
  styleUrls: ['./trip-transport.component.scss']
})
export class TripTransportComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
