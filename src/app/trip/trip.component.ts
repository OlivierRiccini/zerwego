import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { MatDialog } from '@angular/material';
import { TripFormBaseComponent } from './trip-form/trip-form.component';
import { TripOverviewComponent } from './trip-overview/trip-overview.component';
import { DestinationService } from '../services/destination.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  public tripPage = true;

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

  // public countryFlag: string = null;

  public sections = this.tripService.sections;

  public activeSection: string = 'overview';

  // @ViewChild(TripOverviewComponent) child: TripOverviewComponent
  // private trip: TripOverviewComponent;

  constructor(
    private tripService: TripService,
    private destinationService: DestinationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { 
      this.tripService.getTripFormValues().subscribe(trip => {  this.trip = trip; });
    }

  ngOnInit() {
    // this.route.firstChild.data.subscribe(data=> {
    //   console.log(data);
    // });
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['params'] !== 'new') {
            this.id = params['params'];
            this.initTrip(this.id);
          } else {
            this.resetTrip();
            Promise.resolve().then(() => { this.openDialog('new') });
          }
        }
      );
  }

  onActivate(child) {
    // if (child.route.snapshot.routeConfig.path === 'edit') {
    //   Promise.resolve().then(() => { this.openDialog() });
    // }
    this.activeSection = child.route.snapshot.routeConfig.path;
  }

  receiveDataFromTripForm($event) {
    this.tripFormValues = $event;
  }

  async initTrip(id: string) {
    this.tripService.loadTrip(this.id).subscribe(
      response => {
        this.trip = response;
      },
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );
  }

  resetTrip() {
    this.trip = {
      tripName: null,
      destination: null,
      imageUrl: null,
      startDate: null,
      endDate: null,
      participants: []
    }
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

  // openDialog() {
  //   this.modalFormService.openDialog().subscribe(data => {
  //     console.log(data);
  //   });
  // }

  openDialog(mode: string): void {
    const dialogRef = this.dialog.open(TripFormBaseComponent, {
      disableClose: true,
      data: { mode, tripId: this.id },
      panelClass: ['custom-dialog-container']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
