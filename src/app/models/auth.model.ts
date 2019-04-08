export type LoginType =
| 'password'
| 'facebook' 

export type ForgotPasswordMode = 
| 'email'
| 'sms'

export interface ICredentials {
    type: string,
    email: string,
    name?: string,
    password?: string,
    facebookId?: string
}

export interface IForgotPassword {
    type: ForgotPasswordMode,
    email?: string,
    phone?: string
}
