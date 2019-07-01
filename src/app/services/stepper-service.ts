import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Step } from '../models/shared';
// import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class StepperService {
    public stepHasChangedSubject: Subject<Step>  = new Subject();;

    // public initStepHasChangedSubject(step: Step): void {
    //     this.stepHasChangedSubject = new BehaviorSubject(step);
    //     new Subject() 
    // }

    // public listenStepHasChanged(): Observable<Step> {
    //     return this.stepHasChangedSubject.asObservable();
    // }

    public emitCurrentStep(step: Step): void {
        this.stepHasChangedSubject.next(step);
    } 

}

