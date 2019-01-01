import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { pipe, Observer } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { MyErrorStateMatcher } from 'src/app/errorsHandlers/error-state-matcher';
import { StringDecoder } from 'string_decoder';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { isBuffer } from 'util';
import { IUser } from 'src/app/interfaces/user.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripComponent } from '../trip.component';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  id: number;
  editMode = false;
  tripForm: FormGroup;
  participants: FormArray;
  matcher = new MyErrorStateMatcher();

  destinationOptions: any[] = [];
  // To use when getting link
  historySearchCities: any[] = [];
  formValues: ITrip = {
    _id: null,
    tripName: '',
    destination: '',
    imageUrl: '',
    startDate: null,
    endDate: null,
    participants: []
  };

  // Using binding to be able to clear user inputs fields
  username: string;
  email: string;

  greenBtnLabel: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private userService: UserService,
    private destinationService: DestinationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TripComponent>
    ) { }
  
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
    
  sendTripFormValues(): void {
    this.tripService.sendTripFormValues(this.formValues);   
  }
  
  ngOnInit() {
    this.route.data
    .subscribe(
      (data) => {
        console.log(data);
      });
    this.route.params
    .subscribe(
      (params: Params) => {
        console.log(params);
        this.createForm();
      }
      )
    console.log(this.route);
    this.onAutocomplete();
  }
    
  private createForm() {
    this.tripForm = this.fb.group({
      tripName: [''],
      destination: [''],
      imageUrl: [''],
      startDate: [''],
      endDate: [''],
      tripNendDateame: [''],
      participants: this.fb.array([])
    });
    // if (this.editMode) {
    //   const trip = this.tripService.getTrips(this.id);
    //   this.tripForm.controls.tripName.setValue(trip.tripName);
    //   this.tripForm.controls.destination.setValue(trip.destination);
    //   this.tripForm.controls.imageUrl.setValue(trip.imageUrl);
    //   this.tripForm.controls.startDate.setValue(trip.startDate);
    //   this.tripForm.controls.endDate.setValue(trip.endDate);
    //   this.greenBtnLabel = 'Save Trip';
    // } else {
    //   this.greenBtnLabel = 'Create Trip';
    // }
    this.greenBtnLabel = 'Yes, there we go!';
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
    // this.formValues.imageUrl = city._links["city:item"].href;
    return city ? city.matching_full_name : undefined;
  }


  onBlurTripNameInput(value: string) {
    this.formValues.tripName = value;
    this.sendTripFormValues();
    // console.log(value);
  }

  onBlurDestinationInput(value: string) {
    // Get destination name
    this.formValues.destination = value;
    // Get destination image from api
    let cityObject = this.historySearchCities.find(item => {
      return item.matching_full_name === value;
    });
    let link = cityObject ? cityObject._links["city:item"].href : null;
    
    if (link) {
      this.destinationService.getUrbanAreasLink(link) 
      .pipe(
        switchMap((response: any) => this.destinationService.getCityImageLink(JSON.parse(response._body)._links["city:urban_area"].href)),
        switchMap((response: any) => this.destinationService.getDestinationImage(JSON.parse(response._body)._links["ua:images"].href))
      )
      .subscribe(
        (response: any) => {
          this.formValues.imageUrl = JSON.parse(response._body).photos[0].image.web;
          // Get flag
          this.getCountryFlag(value);
          this.sendTripFormValues();
        },
        (error) => {
          console.log(error);
        }
      );
    };
  }

  getCountryFlag(destination) {
    console.log(destination);
    const countryName = destination.split(',')[2].trim();
    this.destinationService.getCountryFlag(countryName)
      .subscribe(resp => {
        this.formValues.countryFlag = JSON.parse(resp._body)[0].flag;
    });
  }
      
  onBlurStartDateInput(value: Date) {
    this.sendTripFormValues();
    this.formValues.startDate = value;
  }
  
  onBlurEndDateInput(value: Date) {
    this.sendTripFormValues();
    this.formValues.endDate = value;
  }

 onSubmit() {
    // if (this.editMode) {
    //     this.tripService.updateTrip(this.id, this.formValues);
    //     this.formValues.participants.forEach((user: IUser) => {
    //       if (!this.userService.checkIfUserExists(user.email)) {
    //         this.userService.createUser(user, this.tripForm.value);
    //       }
    //     });
    // } else {
    //   this.tripService.createTrip(this.tripForm.value);
    //   console.log(this.formValues);
    //   this.formValues.participants.forEach((user: IUser) => {
    //     if (!this.userService.checkIfUserExists(user.email)) {
    //       this.userService.createUser(user, this.tripForm.value);
    //     }
    //   });
    // }
    // this.router.navigate(['./myTrips', 1]);
    this.tripService.createTrip(this.formValues)
      .subscribe(
        (response) => {
          console.log('Trip successfully created!');
          const trip: ITrip = response;
          this.tripService.updateLocalStorage(trip);
          this.router.navigate(['./trips', trip._id, 'overview']);
          this.onCloseDialog(false);
        },
        (err) => console.log(err)
      );

    // this.tripForm.reset();
  }

  onAddAnotherParticipant(username: string, email: string) {
    // this.participants = this.tripForm.get('participants') as FormArray;
   
    let userAlreadyExist = this.formValues.participants.findIndex((user: IUser) => {
      return user.email === email;
    });
    if (username && email) {
      if (userAlreadyExist === -1) {
        // this.participants.push(this.fb.group({ username, email }));
        this.formValues.participants.push({ username, email });
      }
    }
    this.username = '';
    this.email = '';
    this.sendTripFormValues();
  }

  onRemoveParticipant(email) {
    // this.participants = (this.tripForm.get('participants') as FormArray);

    let index = this.formValues.participants.findIndex((user: IUser) => {
      return user.email === email;
    });
    // let doubleCheckIndex2 = this.participants.value.findIndex((user) => {
    //   return user.email === email;
    // });
    // Remove from form array
    // this.participants.removeAt(index);
    // Remove from values to send
    this.formValues.participants.splice(index, 1);
    this.sendTripFormValues();
  }

  onCloseDialog(quit: boolean) {
    this.dialogRef.close();
    if (quit) { this.router.navigate(['/']) };
  }
}
