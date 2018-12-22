import { IUser } from "./user.interface";

export interface ITrip {
    id?: string,
    tripName: string,
    destination: string,
    imageUrl: string,
    startDate: Date;
    endDate: Date;
    participants?: IUser[]
}