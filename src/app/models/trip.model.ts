import { IUser } from '../interfaces/user.interface';

export class Trip {
    public id: number;
    public tripName: string;
    public destination: string;
    public imageUrl: string;
    public startDate: Date;
    public endDate: Date;
    public participants: Array<IUser>;
    
    constructor(id: number,
                tripName: string, 
                destination: string,
                imageUrl: string, 
                startDate: Date, 
                endDate: Date, 
                participants: Array<IUser>
                ) {
                    this.id = id;
                    this.tripName = tripName;
                    this.destination = destination;
                    this.imageUrl = imageUrl;
                    this.startDate = startDate;
                    this.endDate = endDate;
                    this.participants = participants;
                }
}