import { AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { formatPhoneNumber } from './helpers';

export function checkPasswords(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const confirmPassword = control.value;
  
        const passControl = control.root.get('password');
        if (passControl) {
            const passValue = passControl.value;
            if (passValue !== confirmPassword || passValue === '') {
                return {
                    notSame: true
                };
            }
        }
    }
}

export class ValidateEmailNotTaken {
  static createValidator(authService: AuthService) {
    return (control: AbstractControl) => {
      return authService.checkEmailIsTaken(control.value).pipe(
        map((isAlreadyTaken: boolean) => {
        return !isAlreadyTaken ? null : {emailTaken: true};
      }));
    }
  }
}

export class ValidatePhoneNotTaken {
    static createValidator(authService: AuthService) {
      return (control: AbstractControl) => {
        const countryCode: string = control.root.get('countryCallingCode').value;
        const phoneNumber: string = control.value;
        const phone: string = formatPhoneNumber(countryCode, phoneNumber);
        return authService.checkPhoneIsTaken(phone).pipe(
          map((isAlreadyTaken: boolean) => {
          return !isAlreadyTaken ? null : {phoneTaken: true};
        }));
      }
    }
  }