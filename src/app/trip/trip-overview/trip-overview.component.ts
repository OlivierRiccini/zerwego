import { Component, OnInit, Input } from '@angular/core';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-trip-overview',
  templateUrl: './trip-overview.component.html',
  styleUrls: ['./trip-overview.component.scss']
})
export class TripOverviewComponent implements OnInit {
  @Input() tripFormValues: ITrip;
  public id: string;
  public trip: ITrip;

  constructor(private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          if (params['params'] !== 'new') {
            this.id = params['params'];
            this.initTrip(this.id);
          }
        }
      );
    this.initTrip(null);
  }

  initTrip(id: string) {
    this.tripService.loadTrip(this.id).subscribe(
      response => this.trip = response,
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );
  }

}
