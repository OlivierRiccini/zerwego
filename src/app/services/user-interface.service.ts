import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IConfirmData, INotificationData } from '../models/shared';
 
@Injectable()
export class UserInterfaceService  {
    public confirmEvent = new EventEmitter<IConfirmData>();
    public confirResponseEvent = new EventEmitter<boolean>();
    public notificationEvent = new EventEmitter<INotificationData>();

    constructor() {}

    public confirm(confirmData: IConfirmData): Observable<boolean> {
        this.confirmEvent.next(confirmData);
        return this.confirResponseEvent.asObservable();
    }

    getConfirmUserResponse(response: boolean): void {
        console.log(response);
        this.confirResponseEvent.emit(response);
    }

    private notification(notifData: INotificationData) {
        this.notificationEvent.emit(notifData);
    }

    public success(message: string) {
        this.notification({message, type: 'success'});
    }

    public error(message: string) {
        this.notification({message, type: 'error'});
    }
  
}