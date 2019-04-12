import { IUser } from "./user";

export interface ITrip {
    id?: string,
    tripName: string,
    destination: string,
    countryFlag?: string,
    imageUrl: string,
    startDate: Date;
    endDate: Date;
    participants?: IParticipant[];
};

export type ParticipationStatus = 
| 'pending'
| 'request_accepted'
| 'request_rejected'
| 'not_registred'

export interface IParticipant {
    userId?: string,
    info: {
        email: string,
        name: string
    },
    isAdmin?: boolean,
    status: ParticipationStatus
}