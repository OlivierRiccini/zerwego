import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public tagline: string = 'Trips must be memorable, it starts with a good organization';
  private subscriptions: Subscription[] = [];
  private isDialogOpened: boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) {
    this.listenRouteChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private listenRouteChanges(): void {
    this.subscriptions.push(
      this.router.events
        .subscribe(e => {
          if (e instanceof NavigationEnd && e.url.includes('/auth/') && !this.isDialogOpened) {
            this.openDialog();
          }
        })
    )
  }

  private openDialog() {
    const dialogRef = this.dialog.open(AuthComponent, {
      disableClose: false,
      width: '500px',
    });
    this.isDialogOpened = true;
    dialogRef.afterClosed().subscribe(() => {
      const redirectionUrl: string[] = this.authService.isLoggedIn() ? ['./', 'myspace'] : ['/'];
      this.router.navigate(redirectionUrl);
      this.isDialogOpened = false;
    });
  }

}
