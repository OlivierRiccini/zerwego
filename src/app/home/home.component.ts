import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { SigninComponent } from '../auth/signin.component';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from '../auth/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tagline: string = 'Trips must be memorable, it starts with a good organization';
  private dialogSwitch: boolean;

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) {
    this.authService.switchDialogEvent.subscribe((event: boolean) => this.dialogSwitch = event);
    router.events
    .subscribe(e => {
      if (e instanceof NavigationEnd) {
        const url: string = e.url.replace('/', '');
        if (url !== '') { this.openDialog(url) };
      }
    });
  }

  ngOnInit() {}

  async openDialog(mode: string) {
    let dialogRef;
    if (mode === 'signup') { 
      await this.router.navigate(['./', 'signup']);
      dialogRef = this.dialog.open(SignupComponent, {
        width: '350px',
      });
    } else if (mode === 'signin') {
      await this.router.navigate(['./', 'signin']);
      dialogRef = this.dialog.open(SigninComponent, {
        width: '350px',
      });
    }; 
    dialogRef.afterClosed().subscribe(() => {
      if (this.dialogSwitch) {
        this.dialogSwitch = false;
        return;
      }
      this.router.navigate(['/']);
      console.log('The dialog was closed');
    });
  }

}
