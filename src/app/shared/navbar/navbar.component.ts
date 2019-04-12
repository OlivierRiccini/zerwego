import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public currentUser: IUser;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedInResult => this.isLoggedIn = isLoggedInResult);
    this.currentUser = this.authService.getUser();
    this.authService.loggedObs.subscribe(
      user => { 
        this.isLoggedIn = !!user;
        this.currentUser = user ? user : null;
      }
    )
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
