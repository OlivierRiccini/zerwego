import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { MatDialog } from '@angular/material';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripOverviewComponent } from './trip-overview/trip-overview.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  tripFormValues: ITrip;
  id: string;
  public trip: ITrip =  {
    tripName: null,
    destination: null,
    imageUrl: null,
    startDate: null,
    endDate: null,
    participants: []
  }

  public sections = [
    'overview', 
    'destination', 
    'participants', 
    'calendar', 
    'transport', 
    'accomodation', 
    'activities', 
    'budget'
  ];

  public activeSection: string = 'overview';

  // @ViewChild(TripOverviewComponent) child: TripOverviewComponent
  // private trip: TripOverviewComponent;

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
            this.initTrip(this.id);
          } else {
            // this.initTripAsNull();
            Promise.resolve().then(() => { this.openDialog() });
          }
        }
      );
      // setTimeout(() => console.log(this.child.trip), 5000);
      // console.log(this.trip);
  }

  // public receiveTripFromOverview($event) {
  //   console.log($event);
  // }
  onActivate(overVoewComponent) {
    this.activeSection = overVoewComponent.route.snapshot.routeConfig.path;
    // this.trip = overVoewComponent.trip;
    // you have access to the component instance
  }
  // ngAfterViewInit() {
  //   // console.log('on after view init', this.child);
  //   // this returns null
  //   setTimeout( _ => this.methodThatKicksOffAnotherRoundOfChanges());
  // }

  receiveDataFromTripForm($event) {
    this.tripFormValues = $event;
  }

  initTrip(id: string) {
    this.tripService.loadTrip(this.id).subscribe(
      response => {
        this.trip = response;
      },
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );
  }

  initTripAsNull() {
    this.trip = {
      tripName: null,
      destination: null,
      imageUrl: null,
      startDate: null,
      endDate: null,
      participants: []
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TripFormComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
