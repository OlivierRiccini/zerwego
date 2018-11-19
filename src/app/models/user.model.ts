import { Trip } from './trip.model'

export class User {
    public id: number;
    public username: string;
    public email: string;
    public password: string;
    public trips: Array<Trip>;
    public admin: boolean;
    
    constructor(id: number,
                username: string,
                email: string, 
                password: string, 
                trips: Array<Trip>, 
                admin: boolean) {
                    this.id = id;
                    this.username = username;
                    this.email = email;
                    this.password = password;
                    this.trips = trips;
                    this.admin = admin;
                }
}