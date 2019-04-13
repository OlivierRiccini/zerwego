import { ContactMode } from "./shared";

export type LoginType =
| 'password'
| 'facebook' 

export interface ICredentials {
    type: string,
    email: string,
    username?: string,
    password?: string,
    facebookId?: string
}

export interface IForgotPassword {
    type: ContactMode,
    email?: string,
    phone?: string
}
