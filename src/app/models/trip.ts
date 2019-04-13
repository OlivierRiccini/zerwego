import { IUser } from "./user";
import { ContactMode } from "./shared";

export type ParticipationStatus = 
| 'pending'
| 'request_accepted'
| 'request_rejected'
| 'not_registred'

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

export interface IParticipant {
    userId?: string,
    info: {
        username: string
        email?: string,
        phone?: string,
    },
    isAdmin?: boolean,
    contactMethod?: ContactMode,
    status: ParticipationStatus
}