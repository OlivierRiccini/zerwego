import { Component } from '@angular/core';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserInterfaceService } from './services/user-interface.service';
import { IConfirmData, INotificationData } from './models/shared';
import { NotificationComponent } from './shared/notification/notification.component';

// import { geolocation } from 'geolocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerwego';

  constructor(
    private userInterfaceService: UserInterfaceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    userInterfaceService.confirmEvent.subscribe(
      confirmData => {
        if (confirmData) { this.openCofirm(confirmData) }
      }
    )
    userInterfaceService.notificationEvent.subscribe(
      notifData => {
        if (notifData) { this.openNotification(notifData) }
      }
    )
  }

  openCofirm(confirmData: IConfirmData) {
    this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: confirmData
    });
  }

  openNotification(notifData: INotificationData) {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 5000,
      panelClass: [notifData.type],
      data: notifData
    });
  }


}