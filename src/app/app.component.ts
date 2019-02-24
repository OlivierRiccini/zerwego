import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthComponent } from './auth/auth.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SigninComponent } from './auth/signin.component';

// import { geolocation } from 'geolocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerwego';
}