import { Injectable } from '@angular/core';
// // import { Subject } from 'rxjs';

// // import { Trip } from '../models/trip.model';
// // import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

//   private users: User[] = [
//     // new User(1, 'olivier', 'olivier@test.com', null, null, null),
//     // new User(2, 'jano', 'jano@test.com', null, null, null),
//     // new User(3, 'julien', 'julien@test.com', null, null, null),
//   ];

//   constructor() { }

//   getUsers() {
//     return this.users.slice();
//   }

//   createUser(newUser, newTrip) {
//     let newId = this.getLastUserId() + 1;
//     this.users.push(new User(newId, newUser.name, newUser.email, null, [newTrip], false));
//   }

//   private getLastUserId() {
//     return this.users.length > 0 ? this.users[this.users.length - 1].id : 1;
//   }

//   getUser(id) {
//     let user: User;
//     user = this.users.find(user => {
//       return user.id === id;
//     });
//     return user;
//   }

//   checkIfUserExists(userEmail) {
//     let found = this.users.some((user) => {
//       return user.email === userEmail;
//     });
//     return found;
//   }

//   // getUsersByTripId(tripId) {
//   //     let users = this.users.map(user => {
//   //         user.tripIds.includes(tripId);
//   //     });
//   // }

}
