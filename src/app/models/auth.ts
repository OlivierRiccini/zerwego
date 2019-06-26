import { ContactMode } from "./shared";
import { IPhone } from "./user";

export type LoginType =
| 'password'
| 'facebook' 

export interface ICredentials {
    type: LoginType,
    email?: string,
    phone?: IPhone,
    username?: string,
    password?: string,
    facebookId?: string
}

export interface IForgotPassword {
    type: ContactMode,
    email?: string,
    phone?: IPhone
}

export interface ICountryCode {
    emoji: any,
    ioc: string,
    countryCallingCode: string
}
