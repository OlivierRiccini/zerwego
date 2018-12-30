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

  // isActive: true;

  public id: string;
  public trip: ITrip =  {
    tripName: null,
    destination: null,
    imageUrl: null,
    startDate: null,
    endDate: null,
    participants: []
  }

  public sections: string[] = [];

  constructor(private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          if (params['params'] === 'new') {
            this.resetTrip();
          } else {
            this.id = params['params'];
            this.initTrip(this.id);
          }
        }
      );
    this.initSections();
  }

  initTrip(id: string) {
    this.tripService.loadTrip(this.id).subscribe(
      response => { 
        this.trip = response;
        if (!this.trip.imageUrl) { this.trip.imageUrl = response.countryFlag }
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

  initSections() {
    for (let section of this.tripService.sections) {
      if (section !== 'overview') { this.sections.push(section) };
    };
  }

}
