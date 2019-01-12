import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { element } from '@angular/core/src/render3';
import { TripFormBaseComponent } from './trip-form.component';

@Component({
    templateUrl: './trip-form.component.html',
    styleUrls: ['./trip-form.component.scss']
})
export class TripEditFormComponent extends TripFormBaseComponent implements OnInit {
    
  constructor(public route: ActivatedRoute,
    public router: Router,
    public tripService: TripService,
    public userService: UserService,
    public destinationService: DestinationService,
    public fb: FormBuilder,
    public daterangepickerOptions: DaterangepickerConfig,
    public dialogRef: MatDialogRef<TripComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
        super(route, router, tripService, userService, destinationService, fb, daterangepickerOptions, dialogRef, data);
    }

  
  ngOnInit() {
    super.ngOnInit();
  }

  onSubmit() {

  }



}
