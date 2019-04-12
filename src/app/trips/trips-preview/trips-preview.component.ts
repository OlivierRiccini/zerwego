import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { ITrip } from 'src/app/models/trip';

@Component({
  selector: 'app-trips-preview',
  templateUrl: './trips-preview.component.html',
  styleUrls: ['./trips-preview.component.scss']
})
export class TripsPreviewComponent implements OnInit {
  trip: ITrip = {
    id: null,
    tripName: '',
    destination: '',
    imageUrl: '',
    startDate: null,
    endDate: null,
    participants: []
  };
  
  id: string;

  constructor(
    private tripService: TripService,          
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.initTrip(this.id);
        }
      );
  }

  initTrip(id: string) {
    this.tripService.loadTrip(this.id).subscribe(
      response => this.trip = response,
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );
  }

  deleteTrip() {
    this.tripService.deleteTrip(this.id).subscribe(
      () => {
        console.log('Trip deleted with succes!');
        this.router.navigate(['/trips']);
      },
      err => console.log(err)
    );
  }
  
}
