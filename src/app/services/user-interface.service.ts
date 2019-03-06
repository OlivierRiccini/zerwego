import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IConfirmData } from '../interfaces/shared.interfaces';
 
@Injectable()
export class UserInterfaceService  {
    public confirmEvent = new EventEmitter<IConfirmData>();
    public confirResponseEvent = new EventEmitter<boolean>();

    constructor() {}

    public confirm(confirmData: IConfirmData): Observable<boolean> {
        this.confirmEvent.next(confirmData);
        return this.confirResponseEvent.asObservable();
    }

    getConfirmUserResponse(response: boolean): void {
        console.log(response);
        this.confirResponseEvent.emit(response);
    }
  
}