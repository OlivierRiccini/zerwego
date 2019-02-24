import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from '../home/home.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public label = {
      submit: null,
      changeForm: null
  }; 
  public signInMode: boolean = false;
  public signUpMode: boolean = false; 
  public authForm: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthService, public dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit() {
    console.log('test');
    this.createForm();
  }

  private createForm() {
    this.authForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public onChangeDialogMode(mode: 'signup' | 'signin') {
      this.dialogRef.close();
      this.authService.openAuthDialog(mode);
  }

//   private async openDialog(mode: string) {
//     if (mode === 'edit') { 
//       await this.router.navigate(['./', 'trips', this.id, this.activeSection, 'edit'])
//     } else if (mode === 'new') {
//       await this.router.navigate(['./', 'trips', 'new', 'overview']);
//     }; 
//     const dialogRef = this.dialog.open(TripFormBaseComponent, {
//       disableClose: true,
//       data: { mode, tripId: this.id, activeSection: this.activeSection },
//       panelClass: ['custom-dialog-container']
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//     });
//   }

//   public onSingup() {
//     const user = this.authForm.value;
//     this.authService.register(user).subscribe(
//       user => console.log(user),
//       err => console.log('Error= ' + err)
//     )
//   }

}
