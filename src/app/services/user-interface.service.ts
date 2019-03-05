import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
 
@Injectable()
export class UserInterfaceService  {
    public confirmEvent = new Subject<string>();

    constructor() {}

    public confirm(message: string) {
        this.confirmEvent.next(message);
    }

    getConfirmMessage(): Observable<string> {
        return this.confirmEvent.asObservable();
    }
  
}