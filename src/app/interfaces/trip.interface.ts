import { IUser } from "./user.interface";

export interface ITrip {
    _id?: string,
    tripName?: string,
    destination?: string,
    countryFlag?: string,
    imageUrl?: string,
    startDate?: Date;
    endDate?: Date;
    participants?: IUser[]
}