export class Trip {
    public tripName: string;
    public destination: string;
    public dateStart: Date;
    public dateEnd: Date;
    public participants: number;
    
    constructor(tripName: string, 
                destination: string, 
                dateStart: Date, 
                dateEnd: Date, 
                participants: number) {
                    this.tripName = tripName;
                    this.destination = destination;
                    this.dateStart = dateStart;
                    this.dateEnd = dateEnd;
                    this.participants = participants;
                }
}