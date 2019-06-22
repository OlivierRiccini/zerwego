export interface IPhone {
    countryCode: string,
    internationalNumber: string,
    nationalNumber: string,
    number: string,
}

export interface IUser {
    id?: string,
    username: string,
    email?: string,
    phone?: IPhone
}