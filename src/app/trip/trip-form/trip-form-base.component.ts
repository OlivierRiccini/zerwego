import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { switchMap, startWith } from 'rxjs/operators';
import { TripService } from 'src/app/services/trip.service';
// import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ITrip, IParticipant } from 'src/app/models/trip';
import { IUser } from 'src/app/models/user';
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
  
  public id: string;
  public editMode = false;
  public tripForm: FormGroup;
  participants: FormArray;
  destinationOptions: any[] = [];
  // To use when getting link
  historySearchCities: any[] = [];

  // formValues: ITrip = {
  //   id: null,
  //   tripName: '',
  //   destination: '',
  //   imageUrl: '',
  //   startDate: null,
  //   endDate: null,
  //   admin: null,
  //   participants: []
  // };

  public tripAdmin: IUser = null;
  
  tripToEdit: ITrip;
  username: string;
  email: string;
  phone: string;
  
  // greenBtnLabel: string;
  // closeDialogLabel: string;

  public labels = {
    buttons: {
      submit: null,
      cancel: null,
      delete: null
    }
  };

  private activeSection: string = null;
  
  @ViewChild(DaterangePickerComponent)
  public picker: DaterangePickerComponent;

  // public daterange: any = {};
  public options: any = {};

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public tripService: TripService,
    // public userService: UserService,
    public destinationService: DestinationService,
    public fb: FormBuilder,
    public daterangepickerOptions: DaterangepickerConfig,
    public dialogRef: MatDialogRef<TripComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      // this.editMode = data.mode === 'edit';
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
      this.authService.userLoggedEvent.subscribe(user => {
        if (!user) { this.dialogRef.close() };
      })
    }

  sendTripFormValues(): void {
    // this.tripService.sendTripFormValues(this.formValues);   
  }
  
  public ngOnInit() {
    this.createForm();
    this.onAutocomplete();
  }
    
  private createForm() {
    const currentUser = this.authService.getCurrentUser() || null;
    this.tripForm = this.fb.group({
      tripName: [''],
      destination: [''],
      imageUrl: [''],
      dateRange: [''],
      admin: [''],
      participants: this.fb.array([
        {info: {username: currentUser.username, email: currentUser.email}, isAdmin: true}
      ])
    });
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
        // this.formValues.tripName = value;
        // this.sendTripFormValues();
      }
    )
    this.tripForm.get('admin').valueChanges.subscribe(
      user => {
        const previousAdmin = this.tripForm.value.participants.find((u: IParticipant) => u.isAdmin);
        if (previousAdmin) { delete previousAdmin.isAdmin };
        user.isAdmin = true;
        // this.formValues.admin = value;
        // this.tripAdmin = value;
        // this.sendTripFormValues();
      }
    )
  }

  onBlurDestinationInput(value: string) {
    // Get destination name
    // this.formValues.destination = value;
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
          // this.formValues.imageUrl = JSON.parse(response._body).photos[0].image.web;
          // Get flag
          this.getCountryFlag(value);
          // this.sendTripFormValues();
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
        // this.formValues.countryFlag = JSON.parse(resp._body)[0].flag;
    });
  }


  public selectedDate(value: any, datepicker?: any) {
    // this.formValues.startDate = value.start;
    // this.formValues.endDate = value.end;

    // this.sendTripFormValues();
  }

  onAddAnotherParticipant(username: string, email?: string, phone?: string) {
    // let userAlreadyExist = this.formValues.participants.findIndex((user: IUser) => {
    //   return user.email === email;
    // });
    let userAlreadyExist = this.tripForm.value.participants.findIndex((user: IParticipant) => {
      return user.info.email && user.info.email === email || user.info.phone && user.info.phone === phone;
    });
    if (username && email && userAlreadyExist === -1) {
        this.tripForm.value.participants.push({info: {username, email}});
    }
    if (username && phone && userAlreadyExist === -1) {
      this.tripForm.value.participants.push({info: {username, phone}});
    }
    if (username && phone && email && userAlreadyExist === -1) {
      this.tripForm.value.participants.push({info: {username, email, phone}});
    }
    this.username = '';
    this.email = '';
    this.phone = '';
    // this.sendTripFormValues();
  }

  onRemoveParticipant(index: number) {
    if (isNaN(index) || index < 0) {
      console.log('Impossible to remove');
      return;
    }
    this.tripForm.value.participants.splice(index, 1);
    // let index = this.formValues.participants.findIndex((user: IUser) => {
    //   return user.email === email;
    // });
    // let index = this.tripForm.value.participants.findIndex((user: IUser) => {
    //   return user.email === email;
    // });
    // // Remove from values to send
    // this.tripForm.value.participants.splice(index, 1);
    // this.sendTripFormValues();
  }

  onCloseDialog() {
    this.dialogRef.close();
    if (this.editMode) { 
      this.tripService.loadTrip(this.id, true).subscribe(trip => {
        // this.formValues = trip; 
        // this.sendTripFormValues();
        this.router.navigate(['/', 'trips', this.id, this.activeSection]) ;
      });
    } else {
      this.router.navigate(['/']) ;  
    };
  }
}
