import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { ITrip } from 'src/app/models/trip';
import { MatDialog } from '@angular/material';
import { TripFormBaseComponent } from './trip-form/trip-form-base.component';
import { TripOverviewComponent } from './trip-overview/trip-overview.component';
import { DestinationService } from '../services/destination.service';
import { TripAddFormComponent } from './trip-form/trip-form-add.component';
import { TripEditFormComponent } from './trip-form/trip-form-edit.component';
import { ComponentType } from '@angular/cdk/overlay/index';

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
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['params'] !== 'new') {
            this.id = params['params'];
            this.initTrip(this.id);
            if (this.router.url.split('/')[4] === 'edit') {
              Promise.resolve().then(() => { this.openDialog('edit') });
            }
          } else {
            this.resetTrip();
            Promise.resolve().then(() => { this.openDialog('new') });
          }
        }
      );
  }

  onActivate(child) {
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
  
  private async openDialog(mode: string) {
    let component: ComponentType<{}> | TemplateRef<{}>;
    if (mode === 'edit') { 
      await this.router.navigate(['./', 'myspace', 'trips', this.id, this.activeSection, 'edit'])
      component = TripEditFormComponent;
    } else if (mode === 'new') {
      await this.router.navigate(['./', 'myspace', 'trips', 'new', 'overview']);
      component = TripAddFormComponent;
    }; 
    const dialogRef = this.dialog.open(component, {
      disableClose: true,
      data: { mode, tripId: this.id, activeSection: this.activeSection },
      panelClass: ['custom-dialog-container']
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
