
// TYPES
export type NotificationType = 
| 'success'
| 'error'

export type ContactMode =
| 'email'
| 'sms'
| 'whatsApp'

// INTERFACES
export interface IConfirmData {
    message: string,
    trueLabel: string,
    falseLabel: string
}

export interface INotificationData {
    message: string,
    type: NotificationType
}
