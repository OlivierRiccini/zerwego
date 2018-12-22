import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ITrip } from '../interfaces/trip.interface';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripChanged = new Subject<any>();

  public trips: ITrip[] = [];

  constructor(private http: HttpClient) { }

  
  getTrips(): Observable<any> {
    return this.http.get(baseUrl);
  }
  
  getTrip(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
  createTrip(trip: ITrip) {
    let newtTrip: any;
    this.http.post(baseUrl, trip)
    .subscribe(
      (response) => {
        console.log('Trip successfully created!');
        newtTrip = response;
        this.trips.push(newtTrip);
        this.tripChanged.next(newtTrip);
      },
      (err) => console.log(err)
      );
      return newtTrip;
  }
    
  deleteTrip(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
    
  removeFromService(id: string) {
    const index = this.trips.findIndex(trip => trip.id === id);
    this.trips.splice(index, 1);
  }
}
