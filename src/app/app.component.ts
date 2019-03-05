import { Component } from '@angular/core';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { UserInterfaceService } from './services/user-interface.service';

// import { geolocation } from 'geolocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerwego';
  // public confirmMessage: string;

  constructor(private dialog: MatDialog, private userInterfaceService: UserInterfaceService) {
    userInterfaceService.confirmEvent.subscribe(
      res => {
        if (res) { this.onOpenCofirm(res) }
      }
    )
  }

  onOpenCofirm(message) {
    this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { message }
    });
  }

}