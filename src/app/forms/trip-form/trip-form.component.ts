import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  createMode: boolean = false;
  editMode: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.defineFormMode();
  }

  defineFormMode() {
    if (this.router.url === '/newTrip') {
      this.createMode = true;
    }
  }

}
