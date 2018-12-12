import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Trip } from '../models/trip.model';
import { User } from '../models/user.model';
import { ITrip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripChanged = new Subject<Trip>();

  private trips:Trip[] = [
    new Trip(1,
             'I\'m in Miami Beach', 
             'Miami',
             'https://www.miamicondoinvestments.com/wp-content/uploads/2014/02/miami-beach-condos-16.jpg', 
             new Date(2019, 5, 1), 
             new Date(2019, 5, 7), 
             [
              new User(1, 'olivier', 'olivier@test.com', null, null, null),
              new User(3, 'julien', 'julien@test.com', null, null, null)
             ]),
    new Trip(2,
             'Viva Las Vegas', 
             'Las Vegas',
             'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_900,c_fill,g_auto,h_506,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180313182911-01-las-vegas-travel-strip.jpg', 
             new Date(2018, 11, 24), 
             new Date(2018, 11, 30), 
             [
              new User(1, 'olivier', 'olivier@test.com', null, null, null),
              new User(2, 'jano', 'jano@test.com', null, null, null)
             ]),
    new Trip(3,
            'Jano\'s wedding', 
             'Bastia',
             'https://www.augoutdemma.be/wp-content/uploads/2017/06/corsica-linea-marseille-bastia-76.jpg', 
             new Date(2019, 7, 17), 
             new Date(2019, 7, 24), 
             [
              new User(1, 'olivier', 'olivier@test.com', null, null, null),
              new User(2, 'jano', 'jano@test.com', null, null, null),
              new User(3, 'julien', 'julien@test.com', null, null, null),
             ])                          
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

  createTrip(tripFromForm: ITrip) {
    let newId = this.getLastTripId() + 1;
    const newTrip: ITrip = new Trip(
      newId, 
      tripFromForm.tripName, 
      tripFromForm.destination, 
      tripFromForm.imageUrl, 
      tripFromForm.startDate, 
      tripFromForm.endDate, 
      tripFromForm.participants)
      this.trips.push(newTrip);
      
      this.tripChanged.next(newTrip);
  }

  updateTrip(id, tripFromForm: ITrip) {
    let tripToUpdate: ITrip;
    tripToUpdate = this.trips.find(tripInDB => {
      return tripInDB.id === id;
    });

    tripToUpdate.tripName = tripFromForm.tripName;
    tripToUpdate.destination = tripFromForm.destination
    tripToUpdate.imageUrl = tripFromForm.imageUrl
    tripToUpdate.startDate = tripFromForm.startDate
    tripToUpdate.endDate = tripFromForm.endDate 
    tripToUpdate.participants = tripFromForm.participants
  }

  // TO IMPLEMENT WITH HTTP REQUEST TO API
  private getLastTripId() {
    return this.trips.length > 0 ? this.trips[this.trips.length - 1].id : 1;
  }

}
