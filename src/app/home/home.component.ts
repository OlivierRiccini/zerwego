import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { SigninComponent } from '../auth/signin.component';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from '../auth/signup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  tagline: string = 'Trips must be memorable, it starts with a good organization';
  private dialogSwitch: boolean;
  private subscriptions: Subscription[] = [];
  private targetUrl: string;
  private authMode: string;

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) {
    this.subscriptions.push(
      this.authService.switchDialogEvent.subscribe(
        (event: boolean) => this.dialogSwitch = event
      ),
      router.events
        .subscribe(e => {
          if (e instanceof NavigationCancel) {
            this.targetUrl = e.url.replace('/', '');
          } 
          if (e instanceof NavigationEnd) {
            this.authMode = e.url.replace('/', '');
            if (this.authMode !== '') { this.openDialog() };
          }
        })
    )
  }

  ngOnInit() {}

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async openDialog() {
    let dialogRef;
    if (this.authMode === 'signup') { 
      await this.router.navigate(['./', 'signup']);
      dialogRef = this.dialog.open(SignupComponent, {
        width: '350px',
      });
    } else if (this.authMode === 'signin') {
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
      // this.handleRedirectAfterAuth();
      this.router.navigate(['/']);
      console.log('The dialog was closed');
    });
  }

  // private handleRedirectAfterAuth() {
  //   let routeToNavigate: string[];
  //   if (this.targetUrl) {
  //     routeToNavigate = this.targetUrl.split('/');
  //     routeToNavigate.unshift('/');
  //   } else {
  //     routeToNavigate = ['/'];
  //   }
  //   this.router.navigate(routeToNavigate);
  //   console.log(routeToNavigate);
  // }

}
