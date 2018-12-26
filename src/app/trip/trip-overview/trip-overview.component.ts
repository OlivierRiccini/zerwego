import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  // @Output() onInitTrip: EventEmitter<any> = new EventEmitter<any>();
  public id: string;
  public trip: ITrip =  {
    tripName: null,
    destination: null,
    imageUrl: null,
    startDate: null,
    endDate: null,
    participants: []
  }

  constructor(private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          if (params['params'] === 'new') {
            // this.initTripAsNull();
          } else {
            this.id = params['params'];
            this.initTrip(this.id);
          }
        }
      );
  }

  initTrip(id: string) {
    this.tripService.loadTrip(this.id).subscribe(
      response => { 
        this.trip = response;
        // this.onInitTrip.emit(this.trip);
      },
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );
  }

  // initTripAsNull() {
  //   this.trip = {
  //     tripName: null,
  //     destination: null,
  //     imageUrl: null,
  //     startDate: null,
  //     endDate: null,
  //     participants: []
  //   }
  // }

}
