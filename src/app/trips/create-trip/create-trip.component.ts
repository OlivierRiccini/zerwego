import { Component, OnInit, Input } from '@angular/core';
import { ITrip } from 'src/app/interfaces/trip.interface';
import { MatDialog } from '@angular/material';
import { TripFormComponent } from 'src/app/forms/trip-form/trip-form.component';
// import { ITripPreview } from 'src/app/interfaces/trip.interface';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  tripFormValues: ITrip;
  name = "Billy";
  animal = "chat";

  constructor(public dialog: MatDialog) { }

  receiveDataFromTripForm($event) {
    this.tripFormValues = $event;
  }

  ngOnInit() {
    Promise.resolve().then(() => { this.openDialog() });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TripFormComponent, {
      // width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
