import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { MatDialog } from '@angular/material';
import { TripFormComponent } from './trip-form/trip-form.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  tripFormValues: ITrip;
  trip: ITrip;
  id: string;

  constructor(private tripService: TripService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['params'] !== 'new') {
            this.id = params['params'];
            // this.initTrip(this.id);
          } else {
            Promise.resolve().then(() => { this.openDialog() });
          }
        }
      );
  }

  receiveDataFromTripForm($event) {
    this.tripFormValues = $event;
  }

  // initTrip(id: string) {
  //   this.tripService.loadTrip(this.id).subscribe(
  //     response => {
  //       this.trip = response;
  //     },
  //     err => console.error(err),
  //     () => console.log('Observer got a complete notification')
  //   );
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(TripFormComponent, {
      // width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
