import { User } from './user.model'

export class Trip {
    public id: number;
    public tripName: string;
    public destination: string;
    public imageUrl: string;
    public startDate: Date;
    public endDate: Date;
    public users: Array<User>;
    
    constructor(id: number,
                tripName: string, 
                destination: string,
                imageUrl: string, 
                startDate: Date, 
                endDate: Date, 
                users: Array<User>
                ) {
                    this.id = id;
                    this.tripName = tripName;
                    this.destination = destination;
                    this.imageUrl = imageUrl;
                    this.startDate = startDate;
                    this.endDate = endDate;
                    this.users = users;
                }
}