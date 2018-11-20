import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

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
              private tripService: TripService,
              private userService: UserService) { }

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
    if (this.editMode) {
        this.tripService.updateTrip(this.id, this.tripForm.value);
      for (let user of this.tripForm.value.users) {
        if (!this.userService.checkIfUserExists(user.email)) {
          this.userService.createUser(user, this.tripForm.value);
        }
      }
    } else {
      this.tripService.createTrip(this.tripForm.value);
      for (let user of this.tripForm.value.users) {
        if (!this.userService.checkIfUserExists(user.email)) {
          this.userService.createUser(user, this.tripForm.value);
        }
      }
    }
  }

  private initForm() {
    let id = '';
    let tripName = '';
    let destination = '';
    let imageUrl = '';
    let startDate: Date;
    let endDate: Date;
    let users = new FormArray([]);

    if (this.editMode) {
      const trip = this.tripService.getTrip(this.id);
      tripName = trip.tripName;
      destination = trip.destination;
      imageUrl = trip.imageUrl;
      startDate = trip.startDate;
      endDate = trip.endDate;
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
      'startDate': new FormControl(startDate),
      'endDate': new FormControl(endDate),
      'users': users
    });
  }

  onAddAnotherUser() {
    (<FormArray>this.tripForm.get('users')).push(
      new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.required)
      })
    );
  }

}
