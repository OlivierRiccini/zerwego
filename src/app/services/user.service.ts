import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

import { Trip } from '../models/trip.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users:User[] = [
    // new User(1, 'olivier', 'olivier@test.com', null, null, null),
    // new User(2, 'jano', 'jano@test.com', null, null, null),
    // new User(3, 'julien', 'julien@test.com', null, null, null),
  ];

  constructor() { }

  getusers() {
    return this.users.slice();
  }

  getTrip(id) {
    let user: User;
    user = this.users.find(user => {
      return user.id === id;
    });
    return user;
  }

  // getUsersByTripId(tripId) {
  //     let users = this.users.map(user => {
  //         user.tripIds.includes(tripId);
  //     });
  // }

}
