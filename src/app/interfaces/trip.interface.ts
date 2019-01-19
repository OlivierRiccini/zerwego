import { IUser } from "./user.interface";

export interface ITrip {
    id?: string,
    tripName?: string,
    destination?: string,
    countryFlag?: string,
    imageUrl?: string,
    startDate?: Date;
    endDate?: Date;
    admin?: IUser;
    participants?: IUser[]
}