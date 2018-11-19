import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { TripService } from 'src/app/services/trip.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  id: number;
  editMode = false;
  tripForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private tripService: TripService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  onSubmit() {
    console.log(this.tripForm);
  }

  private initForm() {
    let id = '';
    let tripName = '';
    let destination = '';
    let imageUrl = '';
    let dateStart: Date;
    let dateEnd: Date;
    let users = new FormArray([]);

    if (this.editMode) {
      const trip = this.tripService.getTrip(this.id);
      tripName = trip.tripName;
      destination = trip.destination;
      imageUrl = trip.imageUrl;
      dateStart = trip.dateStart;
      dateEnd = trip.dateEnd;
      if (trip['users']) {
        for (let user of trip.users) {
          users.push(
            new FormGroup({
              'username': new FormControl(user.username),
              'email': new FormControl(user.email)
            })
          );
        }
      }
      
    }

    this.tripForm = new FormGroup({
      'tripName': new FormControl(tripName),
      'destination': new FormControl(destination),
      'imageUrl': new FormControl(imageUrl),
      'dateStart': new FormControl(dateStart),
      'dateEnd': new FormControl(dateEnd),
      'users': users
    });
  }

}
