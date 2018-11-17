import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

import { Trip } from '../models/trip.model'

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // tripsChanged = new Subject<Trip[]>();
  private trips:Trip[] = [
    new Trip(1,
             'I\'m in Miami Beach', 
             'Miami',
             'https://www.miamicondoinvestments.com/wp-content/uploads/2014/02/miami-beach-condos-16.jpg', 
             new Date(2019, 5, 1), 
             new Date(2019, 5, 7), 
             20),
    new Trip(2,
             'Viva Las Vegas', 
             'Las Vegas',
             'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_900,c_fill,g_auto,h_506,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180313182911-01-las-vegas-travel-strip.jpg', 
             new Date(2018, 11, 24), 
             new Date(2018, 11, 30), 
             1),
    new Trip(3,
            'Jano\'s wedding', 
             'Bastia',
             'https://www.augoutdemma.be/wp-content/uploads/2017/06/corsica-linea-marseille-bastia-76.jpg', 
             new Date(2019, 7, 17), 
             new Date(2019, 7, 24), 
             200),                          
  ];

  constructor() { }

  getTrips() {
    return this.trips.slice();
  }

  getTrip(id) {
    let trip: Trip;
    trip = this.trips.find(trip => {
      return trip.id === id;
    });
    return trip;
  }

}
