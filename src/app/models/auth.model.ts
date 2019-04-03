export type LoginType =
| 'password'
| 'facebook' 

export interface ICredentials {
    type: string,
    email: string,
    name?: string,
    password?: string,
    facebookId?: string
}