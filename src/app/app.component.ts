import { Component } from '@angular/core';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { UserInterfaceService } from './services/user-interface.service';
import { IConfirmData } from './interfaces/shared.interfaces';

// import { geolocation } from 'geolocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerwego';

  constructor(private dialog: MatDialog, private userInterfaceService: UserInterfaceService) {
    userInterfaceService.confirmEvent.subscribe(
      confirmData => {
        if (confirmData) { this.onOpenCofirm(confirmData) }
      }
    )
  }

  onOpenCofirm(confirmData: IConfirmData) {
    this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: confirmData
    });
  }

}