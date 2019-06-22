import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
// import { UserService } from 'src/app/services/user.service';
import { DestinationService } from 'src/app/services/destination.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripComponent } from '../trip.component';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { TripFormBaseComponent } from './trip-form-base.component';
import { AuthService } from 'src/app/services/auth.service';
import { ITrip } from 'src/app/models/trip';

@Component({
    templateUrl: './trip-form.component.html',
    styleUrls: ['./trip-form.component.scss']
})
export class TripAddFormComponent extends TripFormBaseComponent implements OnInit {

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
      // this.labels = {
      //   buttons: {
      //     submit: 'Create',
      //     cancel: 'Give up',
      //     delete: null
      //   }
      // }
    }

  
  public ngOnInit() {
    super.ngOnInit();
    this.setLabels();
  }

  onSubmit() {
    // let admin = this.tripForm.value.participants.find(user => user.name === this.tripForm.value.admin);
    // if (!admin) {
    //   console.log('error');
    // }
    // const newTrip: ITrip = {
    //   tripName: this.tripForm.value.tripName,
    //   destination: this.tripForm.value.destination,
    //   imageUrl: this.tripForm.value.imageUrl,
    //   startDate: this.tripForm.value.startDate,
    //   endDate: this.tripForm.value.endDate,
    //   participants: this.tripForm.value.participants
    // };
    // console.log(newTrip);
    this.tripService.createTrip(this.tripForm.value)
      .subscribe(
        (response) => {
          console.log('Trip successfully created!');
          const trip: any = response;
          console.log(response);
          this.tripService.updateLocalStorage(trip);
          this.router.navigate(['./myspace', 'trips', trip.id, 'overview']);
          // this.onCloseDialog();
          this.dialogRef.close();
        },
      (err) => console.log(err)
    );
  }

  private setLabels(): void {
    this.labels = {
      buttons: {
        submit: 'Create',
        cancel: 'Give up',
        delete: null
      }
    }
  }



}
