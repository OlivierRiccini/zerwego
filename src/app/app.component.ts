import { Component } from '@angular/core';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserInterfaceService } from './services/user-interface.service';
import { IConfirmData, INotificationData } from './models/shared';
import { NotificationComponent } from './shared/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerwego';
  public userCountry: string;

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

  public openCofirm(confirmData: IConfirmData): void {
    this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: confirmData
    });
  }

  public openNotification(notifData: INotificationData): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 6000,
      panelClass: [notifData.type],
      data: notifData
    });
  }

}