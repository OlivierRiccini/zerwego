import { ContactMode } from "./shared";

export type LoginType =
| 'password'
| 'facebook' 

export interface ICredentials {
    type: LoginType,
    email?: string,
    phone?: string,
    username?: string,
    password?: string,
    facebookId?: string
}

export interface IForgotPassword {
    type: ContactMode,
    email?: string,
    phone?: string
}
