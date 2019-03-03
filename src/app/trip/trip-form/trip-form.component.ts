import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { switchMap, startWith } from 'rxjs/operators';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripComponent } from '../trip.component';
import * as moment from 'moment';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormBaseComponent implements OnInit {
  
  id: string;
  editMode = false;
  tripForm: FormGroup;
  participants: FormArray;
  destinationOptions: any[] = [];
  // To use when getting link
  historySearchCities: any[] = [];
  formValues: ITrip = {
    id: null,
    tripName: '',
    destination: '',
    imageUrl: '',
    startDate: null,
    endDate: null,
    admin: null,
    participants: []
  };

  public tripAdmin: IUser = null;
  
  tripToEdit: ITrip;
  username: string;
  email: string;
  
  greenBtnLabel: string;
  closeDialogLabel: string;

  public labels = {
    buttons: {
      submit: null,
      cancel: null,
      delete: null
    }
  };

  private activeSection: string = null;
  
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  // public daterange: any = {};
  public options: any = {};

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public tripService: TripService,
    public userService: UserService,
    public destinationService: DestinationService,
    public fb: FormBuilder,
    public daterangepickerOptions: DaterangepickerConfig,
    public dialogRef: MatDialogRef<TripComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.editMode = data.mode === 'edit';
      this.activeSection = data.activeSection;
      this.id = data.tripId;

      this.daterangepickerOptions.settings = {
        locale: { format: 'YYYY-MM-DD' },
        daterangepickerOptions: true,
        autoApply: true,
        opens: "left",
        drops: "down",
        linkedCalendars: false
      };
      this.daterangepickerOptions.skipCSS = true; 
      this.authService.loggedObs.subscribe(user => {
        if (!user) { this.dialogRef.close() };
      })
    }

  sendTripFormValues(): void {
    this.tripService.sendTripFormValues(this.formValues);   
  }
  
  ngOnInit() {
    this.createForm();
    this.onAutocomplete();
  }
    
  private createForm() {
    this.tripForm = this.fb.group({
      tripName: [''],
      destination: [''],
      imageUrl: [''],
      dateRange: [''],
      admin: [''],
      participants: this.fb.array([])
    });
    if (this.editMode) {
      this.tripService.loadTrip(this.id).subscribe(trip => {
        this.formValues = trip; 
        this.tripForm.controls.tripName.setValue(trip.tripName);
        this.tripForm.controls.destination.setValue(trip.destination);
        this.tripForm.controls.imageUrl.setValue(trip.imageUrl);
        this.picker.datePicker.setStartDate(moment(trip.startDate).format('YYYY-MM-DD'));
        this.picker.datePicker.setEndDate(moment(trip.endDate).format('YYYY-MM-DD'));
        this.tripToEdit = trip;
      });
      this.labels = {
        buttons: {
          submit: 'Save changes',
          cancel: 'Close without saving',
          delete: null
        }
      }
    } else {
      this.labels = {
        buttons: {
          submit: 'Create',
          cancel: 'Give up',
          delete: null
        }
      }
    }
    this.onInputChangesSubscriptions();
  }

onAutocomplete(): void {
  this.tripForm
    .get('destination')
    .valueChanges
    .pipe(
      // debounceTime(10000),
      startWith(''),
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
    if (city) {
      return city.matching_full_name ? city.matching_full_name : city;
    } else {
      return undefined;
    }
  }

  onInputChangesSubscriptions() {
    this.tripForm.get('tripName').valueChanges.subscribe(
      value => {
        this.formValues.tripName = value;
        this.sendTripFormValues();
      }
    )
    this.tripForm.get('admin').valueChanges.subscribe(
      value => {
        this.formValues.admin = value;
        this.tripAdmin = value;
        this.sendTripFormValues();
      }
    )
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


  public selectedDate(value: any, datepicker?: any) {
    this.formValues.startDate = value.start;
    this.formValues.endDate = value.end;

    this.sendTripFormValues();
  }

  onSubmit() {
    if (this.editMode) {
      console.log(this.formValues);
      console.log('UPDATE NOT IMPLEMENTED YET');
    } else {
      console.log(this.formValues);
      this.tripService.createTrip(this.formValues)
        .subscribe(
          (response) => {
            console.log('Trip successfully created!');
            const trip: ITrip = response;
            this.tripService.updateLocalStorage(trip);
            this.router.navigate(['./trips', trip.id, 'overview']);
            // this.onCloseDialog();
            this.dialogRef.close();
          },
          (err) => console.log(err)
        );
    }
  }

  onAddAnotherParticipant(username: string, email: string) {
    let userAlreadyExist = this.formValues.participants.findIndex((user: IUser) => {
      return user.email === email;
    });
    if (username && email) {
      if (userAlreadyExist === -1) {
        this.formValues.participants.push({ username, email});
      }
    }
    this.username = '';
    this.email = '';
    this.sendTripFormValues();
  }

  onRemoveParticipant(email) {
    let index = this.formValues.participants.findIndex((user: IUser) => {
      return user.email === email;
    });
    // Remove from values to send
    this.formValues.participants.splice(index, 1);
    this.sendTripFormValues();
  }

  onCloseDialog() {
    this.dialogRef.close();
    if (this.editMode) { 
      this.tripService.loadTrip(this.id, true).subscribe(trip => {
        this.formValues = trip; 
        this.sendTripFormValues();
        this.router.navigate(['/', 'trips', this.id, this.activeSection]) ;
      });
    } else {
      this.router.navigate(['/']) ;  
    };
  }
}
