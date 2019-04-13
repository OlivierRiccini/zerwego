import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { switchMap, startWith } from 'rxjs/operators';
import { TripService } from 'src/app/services/trip.service';
// import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ITrip } from 'src/app/models/trip';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripComponent } from '../trip.component';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { TripFormBaseComponent } from './trip-form-base.component';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';

@Component({
    templateUrl: './trip-form.component.html',
    styleUrls: ['./trip-form.component.scss']
})
export class TripEditFormComponent extends TripFormBaseComponent implements OnInit {
    
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
        super(route, router, authService, tripService, destinationService, fb, daterangepickerOptions, dialogRef, data);
        this.editMode = true;
      }
      
      
  ngOnInit() {
    super.ngOnInit();
    this.setFormValues();
    this.setLabels();
  }

  private setFormValues(): void {
    this.tripService.loadTrip(this.id).subscribe(trip => {
      // this.formValues = trip; 
      this.tripForm.controls.tripName.setValue(trip.tripName);
      this.tripForm.controls.destination.setValue(trip.destination);
      this.tripForm.controls.imageUrl.setValue(trip.imageUrl);
      this.tripForm.controls.participants.setValue(trip.participants);
      this.picker.datePicker.setStartDate(moment(trip.startDate).format('YYYY-MM-DD'));
      this.picker.datePicker.setEndDate(moment(trip.endDate).format('YYYY-MM-DD'));
      this.tripToEdit = trip;
    });
  }

  private setLabels(): void {
    this.labels = {
      buttons: {
        submit: 'Save changes',
        cancel: 'Close without saving',
        delete: null
      }
    }
  }

  onSubmit() {
    console.log(this.tripForm.value);
    console.log('UPDATE NOT IMPLEMENTED YET');
  }



}
