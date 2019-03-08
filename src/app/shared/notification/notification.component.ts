import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { UserInterfaceService } from 'src/app/services/user-interface.service';
// import { IConfirmData } from 'src/app/interfaces/shared.interfaces';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public notificationData: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private userInterfaceService: UserInterfaceService,
    // public dialogRef: MatDialogRef<ConfirmComponent>
    ) { 
    // this.userInterfaceService.confirmEvent.subscribe(
    //   confirmData => {
    //     this.confirmData = confirmData;
    //   } 
    // )
    userInterfaceService.notificationEvent.subscribe(
        notifData => {
            this.notificationData = notifData
        }
    )
  }

  ngOnInit() {}

//   onResponse(response: boolean): void {
//     console.log(response);
//     this.userInterfaceService.getConfirmUserResponse(response);
//     this.dialogRef.close();
//   }

}
