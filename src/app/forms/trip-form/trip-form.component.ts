import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { pipe, Observer } from 'rxjs';

import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ITripPreview } from 'src/app/interfaces/trip.interface';
import { MyErrorStateMatcher } from 'src/app/errorsHandlers/error-state-matcher';
import { StringDecoder } from 'string_decoder';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  id: number;
  editMode = false;
  tripForm: FormGroup;
  users: FormArray;
  matcher = new MyErrorStateMatcher();

  destinationOptions: any[] = [];
  // To use when getting link
  historySearchCities: any[] = [];
  valuesToSend: ITripPreview = {
    tripName: '',
    destination: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
    participants: []
  };

  @Output() dataFromCreateTripEvent = new EventEmitter<ITripPreview>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private userService: UserService,
    private destinationService: DestinationService,
    private fb: FormBuilder) { }
    
    sendDatasToPreview() {
    this.dataFromCreateTripEvent.emit(this.valuesToSend);
  }
  
  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.createForm();
      }
    )
    this.onAutocomplete();
    this.sendDatasToPreview();
  }
    
  private createForm() {
    this.tripForm = this.fb.group({
      tripName: [''],
      destination: [''],
      imageUrl: [''],
      startDate: [''],
      endDate: [''],
      tripNendDateame: [''],
      users: this.fb.array([])
    });
    if (this.editMode) {
      const trip = this.tripService.getTrip(this.id);
      this.tripForm.controls.tripName.setValue(trip.tripName);
      this.tripForm.controls.destination.setValue(trip.destination);
      this.tripForm.controls.imageUrl.setValue(trip.imageUrl);
      this.tripForm.controls.startDate.setValue(trip.startDate);
      this.tripForm.controls.endDate.setValue(trip.endDate);
    }
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
        let citiesArray: Array<any> = JSON.parse(response._body)._embedded["city:search-results"].slice();
        for (let city of citiesArray) {
          this.destinationOptions = citiesArray;
          this.historySearchCities.push(city);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  displayFn(city?): string | undefined {
    // this.valuesToSend.imageUrl = city._links["city:item"].href;
    return city ? city.matching_full_name : undefined;
  }


  onBlurTripNameInput(value: string) {
    this.valuesToSend.tripName = value;
  }

  onBlurDestinationInput(value: string) {
    // Get destination name
    this.valuesToSend.destination = value;
    // Get destination image from api
    let cityObject = this.historySearchCities.find(item => {
      return item.matching_full_name === value;
    });
    let link = cityObject ? cityObject._links["city:item"].href : null;
    
    if (link) {
      this.destinationService.getUrbanAreasLink(link) 
      .pipe(
        // debounceTime(10000),
        switchMap((response: any) => this.destinationService.getCityImageLink(JSON.parse(response._body)._links["city:urban_area"].href)),
        switchMap((response: any) => this.destinationService.getDestinationImage(JSON.parse(response._body)._links["ua:images"].href))
      )
      .subscribe(
        (response: any) => {
          console.log(JSON.parse(response._body).photos[0].image.web);
          this.valuesToSend.imageUrl = JSON.parse(response._body).photos[0].image.web;
        },
        (error) => {
          console.log(error);
        }
      );
    };
  }
      
  onBlurStartDateInput(value: string) {
    this.valuesToSend.startDate = value;
  }
  
  onBlurEndDateInput(value: string) {
    this.valuesToSend.endDate = value;
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

  onAddAnotherUser(username, email) {
    this.users = this.tripForm.get('users') as FormArray;
   
    let userAlreadyExist = this.tripForm.value.users.findIndex((user) => {
      return user.email === email;
    });
    if (username && email) {
      if (userAlreadyExist === -1) {
        this.users.push(this.fb.group({ username, email }));
        this.valuesToSend.participants.push({ username, email });
      }
    }
    // this.users.controls[0].controls.usgt
    // this.tripForm.get('users').resetForm();
    // for (let c of this.tripForm.controls.users.controls) {
    //   console.log(c.controls.username)
    //   c.controls.username.value = null;
    //   c.controls.username._pendingValue = null;
    // }
    // this.users.controls[0].controls._pendingValue = ' ';
    console.log(this.tripForm.controls.users);
  }

  onRemoveUser(email) {
    this.users = this.tripForm.get('users') as FormArray;

    let doubleCheckIndex1 = this.valuesToSend.participants.findIndex((user) => {
      return user.email === email;
    });
    let doubleCheckIndex2 = this.users.value.findIndex((user) => {
      return user.email === email;
    });
    // Remove from form array
    this.tripForm.get('users').removeAt(doubleCheckIndex2); 
    // Remove from values to send
    this.valuesToSend.participants.splice(doubleCheckIndex1, 1);
  }
}
