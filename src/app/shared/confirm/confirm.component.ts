import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { IConfirmData } from 'src/app/interfaces/shared.interfaces';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public confirmData: IConfirmData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmData,
    private userInterfaceService: UserInterfaceService,
    public dialogRef: MatDialogRef<ConfirmComponent>
    ) { 
    this.userInterfaceService.confirmEvent.subscribe(
      confirmData => {
        this.confirmData = confirmData;
      } 
    )
  }

  ngOnInit() {}

  onResponse(response: boolean): void {
    console.log(response);
    this.userInterfaceService.getConfirmUserResponse(response);
    this.dialogRef.close();
  }

}
