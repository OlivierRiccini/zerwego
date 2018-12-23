import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, of } from 'rxjs';
import { ITrip } from '../interfaces/trip.interface';
import { HttpClient } from '@angular/common/http';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { tripPreviewComponent } from '../trips/create-trip/trip-preview/trip-preview.component';

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

  // Create simple observable that emits three values
  loadTrip(id: string): Observable<any> {
    const observable = Observable.create(subscirber => {
      const trip = this.trips.find(t => t._id === id);
      if (trip) {
        console.log('Found it in service!');
        subscirber.next(trip);
      } else {
        console.log(`Could not find trip with id ${id} in service, searching in DB...`)
        this.getTrip(id).subscribe(
          serverResponse => {
            subscirber.next(serverResponse);
            console.log('Found it in DB!');
          },
          err => {
            subscirber.error(new Error(`Error could not even find trip with id ${id} in DB`));
          }
        );
      }
    });
    return observable;
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
    const index = this.trips.findIndex(trip => trip._id === id);
    this.trips.splice(index, 1);
  }
}
