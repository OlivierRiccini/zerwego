import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

import { Trip } from '../models/trip.model'

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // tripsChanged = new Subject<Trip[]>();
  private trips:Trip[] = [
    new Trip('Viva Las Vegas', 
             'Las Vegas', 
             new Date(2018, 11, 24), 
             new Date(2018, 11, 30), 
             1),
    new Trip('I\'m in Miami Beach', 
             'Miami', 
             new Date(2019, 5, 1), 
             new Date(2019, 5, 7), 
             20),
    new Trip('Viva Las Vegas', 
             'Las Vegas', 
             new Date(2018, 11, 24), 
             new Date(2018, 11, 30), 
             1),
    new Trip('Jano\s wedding', 
             'Bastia', 
             new Date(2019, 7, 17), 
             new Date(2019, 7, 24), 
             200),                          
  ];

  constructor() { }

  getTrips() {
    console.log(this.trips);
    return this.trips.slice();
  }

}
