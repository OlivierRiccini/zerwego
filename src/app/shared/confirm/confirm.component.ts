import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public message: string;

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ConfirmComponent>, private userInterfaceService: UserInterfaceService) { 
    // userInterfaceService.getConfirmMessage().subscribe(
    //   message => this.message = message
    // )
    this.userInterfaceService.getConfirmMessage().subscribe(
      message => {
        this.message = message;
        this.onOpenCofirm();
        console.log(message);
      } 
    )
  }

  ngOnInit() {
    // this.userInterfaceService.getConfirmMessage().subscribe(
    //   message => {
    //     this.message = message;
    //     this.onOpenCofirm();
    //     console.log(message);
    //   } 
    // )
  }

  onOpenCofirm() {
    this.dialog.open(ConfirmComponent, {
      width: '350px',
    });
  }

}
