import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-budget',
  templateUrl: './trip-budget.component.html',
  styleUrls: ['./trip-budget.component.scss']
})
export class TripBudgetComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
