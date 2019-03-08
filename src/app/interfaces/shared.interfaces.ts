export interface IConfirmData {
    message: string,
    trueLabel: string,
    falseLabel: string
}

export type NotificationType = 
| 'success'
| 'error'


export interface INotificationData {
    message: string,
    type: NotificationType
}