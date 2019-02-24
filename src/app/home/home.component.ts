import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { SigninComponent } from '../auth/signin.component';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from '../auth/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tagline: string = 'Trips must be memorable, it starts with a good organization';

  constructor(public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) { 
    // this.router.events.subscribe(val => {
    //   console.log(this.router.url);
    // });
    // this.activatedRoute.data
    // .subscribe(
    //   (data) => {
    //     console.log(data['mode']);
    //   }
    // );
    // Promise.resolve().then(() => { this.openDialog() });
  }

  ngOnInit() {
    // const routeInit: string = this.router.url.replace('/', '');
    // if (routeInit !== '') {
    //   this.openDialog(routeInit)
    // }
    this.authService.openAuthDialogEvent.subscribe(
      mode => {
        this.openDialog(mode)
        // Promise.resolve().then(() => { this.openDialog(mode) })
      }
    );
  }

  async openDialog(mode: string) {
    let dialogRef;
    if (mode === 'signup') { 
      await this.router.navigate(['./', 'signup']);
      dialogRef = this.dialog.open(SignupComponent, {
        width: '250px',
      });
    } else if (mode === 'signin') {
      await this.router.navigate(['./', 'signin']);
      dialogRef = this.dialog.open(SigninComponent, {
        width: '250px',
      });
    }; 
    dialogRef.afterClosed().subscribe(result => {
      // this.router.navigate(['/']);
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
