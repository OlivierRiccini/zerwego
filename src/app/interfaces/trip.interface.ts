export interface ITrip {
    id: number,
    tripName: string,
    destination: string,
    imageUrl: string,
    startDate: Date;
    endDate: Date;
    participants: object[];
}