import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { UserInterfaceService } from 'src/app/services/user-interface.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent {
  public notificationData: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private userInterfaceService: UserInterfaceService,
    ) {
    userInterfaceService.notificationEvent.subscribe(
        (notifData: string) => {
            this.notificationData = notifData
        }
    )
  }

}
