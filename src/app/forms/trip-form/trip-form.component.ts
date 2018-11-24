import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { debounceTime, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
// import { formControlBinding } from '@angular/forms/src/directives/ng_model';
// import { emit } from 'cluster';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  id: number;
  editMode = false;
  tripForm: FormGroup;

  destinationOptions: string[] = [];
  imageUrl: string;

  // @Output() autocompleteEvent = new EventEmitter<string[]>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tripService: TripService,
              private userService: UserService,
              private destinationService: DestinationService) { }

  // sendDestinations() {
  //   this.autocompleteEvent.emit(this.destinationOptions);
  // }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
    this.onAutocomplete();
  }

onAutocomplete(): void {
    // this.sendDestinations();
    this.tripForm
      .get('destination')
      .valueChanges
      .pipe(
        // debounceTime(10000),
        switchMap(value => this.destinationService.searchDestination(value))
      )
      .subscribe(
        (response: any) => {
          let citiesArray: Array<any> = JSON.parse(response._body)._embedded["city:search-results"];
          for (let city of citiesArray) {
            this.destinationOptions = citiesArray;
            // console.log(city.matching_full_name);
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
    this.router.navigate(['./myTrips', 1]); 
    this.tripForm.reset();
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
