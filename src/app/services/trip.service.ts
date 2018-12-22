import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Http, RequestOptions } from '@angular/http';
import { Trip } from '../models/trip.model';
import { User } from '../models/user.model';
import { ITrip } from '../interfaces/trip.interface';
import { HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripChanged = new Subject<Trip>();

  constructor(private http: HttpClient) { }

  createTrip(trip: ITrip) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Content-type': 'application/json',
      })
    };

    return this.http.post(baseUrl, trip, httpOptions)
      .subscribe(
        () => console.log('Trip successfully created!'),
        (err) => console.log(err)
      );
  }

}
