import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { switchMap, startWith } from 'rxjs/operators';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripComponent } from '../trip.component';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { TripFormBaseComponent } from './trip-form.component';
import { AuthService } from 'src/app/services/auth.service';

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
    public userService: UserService,
    public destinationService: DestinationService,
    public fb: FormBuilder,
    public daterangepickerOptions: DaterangepickerConfig,
    public dialogRef: MatDialogRef<TripComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
        super(route, router, authService, tripService, userService, destinationService, fb, daterangepickerOptions, dialogRef, data);
        
      }
      
      
  ngOnInit() {
    super.ngOnInit();
  }

  onSubmit() {

  }



}
