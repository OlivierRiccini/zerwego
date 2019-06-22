import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, of } from 'rxjs';
import { ITrip } from '../models/trip';
import { HttpClient } from '@angular/common/http';
import { DestinationService } from './destination.service';
// import { tripPreviewComponent } from '../trips/create-trip/trip-preview/trip-preview.component';

const baseUrl = 'http://localhost:3000/trips';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripChanged = new Subject<any>();

  sendTripFormValues(trip: ITrip) {
    this.tripChanged.next(trip);
  }

  getTripFormValues(): Observable<any> {
    return this.tripChanged.asObservable();
  }

  public trips: ITrip[] = [];
  public sections = [
    'overview', 
    'destination', 
    'participants', 
    'calendar', 
    'transport', 
    'accomodation', 
    'activities', 
    'budget'
  ];

  constructor(private http: HttpClient,
              private destinationService: DestinationService) { }

  
  getTrips(): Observable<any> {
    return this.http.get(baseUrl);
  }
  
  getTrip(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
  createTrip(trip: ITrip) {
    this.trips.push(trip);
    return this.http.post(baseUrl, trip)

  }
    
  deleteTrip(id: string): Observable<any> {
    // Remove from local storage
    const index = this.trips.findIndex(trip => trip.id === id);
    index >= 0 ? this.trips.splice(index, 1) : console.log('Error');
    // DB
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // MANAGE DATA CACHED IN SERVICE
  
  // removeFromService(id: string) {
  //   const index = this.trips.findIndex(trip => trip.id === id);
  //   this.trips.splice(index, 1);
  // }

  loadTrip(id: string, onlyFromDB?: boolean): Observable<any> {
    const observable = Observable.create(subscriber => {
      const trip = this.trips.find(t => t.id === id);
      if (trip && !onlyFromDB) {
        console.log('Found it in service!');
        // Fecth country flag and call next with it
        const countryName = trip.destination.split(',')[2].trim();
        this.destinationService.getCountryFlag(countryName)
        .subscribe(resp => {
          trip.countryFlag = JSON.parse(resp._body)[0].flag;
          subscriber.next(trip);
        });
    
      } else {
        console.log(`Could not find trip with id ${id} in service, searching in DB...`)
        this.getTrip(id).subscribe(
          serverResponse => {
            // Fecth country flag and call next with it
            const countryName = serverResponse.destination.split(',')[2].trim();
  
            this.destinationService.getCountryFlag(countryName)
            .subscribe(resp => {
              serverResponse.countryFlag = JSON.parse(resp._body)[0].flag;
              subscriber.next(serverResponse);
            });
            console.log('Found it in DB!');
          },
          err => {
            subscriber.error(new Error(`Error could not even find trip with id ${id} in DB`));
          }
        );
      }
    });
    return observable;
  }

  updateLocalStorage(trip: ITrip) {
    this.trips.push(trip);
    this.tripChanged.next(trip);
  }
}
