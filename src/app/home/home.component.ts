import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tagline: string = 'Trips must be memorable, it starts with a good organization';

  constructor() { }

  ngOnInit() {
  }

}
