import { AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { formatPhoneNumber } from './helpers';
import { ICredentials } from 'src/app/models/auth';

export function checkPasswords(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
      const confirmPassword = control.value;

      const passControl = control.root.get('password') || control.root.get('newPassword');
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

export class ValidatePassword {
    static createValidator(authService: AuthService, field: 'email' | 'phone' | 'password') {
      return (control: AbstractControl) => {
        const credentials: ICredentials = this.buildCredentials(control, field);
        const loginMode: 'email' | 'phone' = this.defineLoginMode(control);

        return authService.checkPasswordIsValid(credentials).pipe(
          map((isValid: boolean) => {
            if (isValid) {
              control.root.get(loginMode).setErrors(null);
              control.root.get('password').setErrors(null);
            } else {
              control.root.get(loginMode).setErrors({ passwordNotValid: true });
              control.root.get('password').setErrors({ passwordNotValid: true });
            }

            return isValid ? null : { passwordNotValid: true };
        }));
      }
    }

  static buildCredentials(control: AbstractControl, field: 'email' | 'phone' | 'password'): ICredentials {
    let credentials: ICredentials = { type: 'password', password: null};

    if (field === 'password') {
      credentials.password = control.value;
      if (control.root.get('email')) {
        credentials.email = control.root.get('email').value;
      }
      if (control.root.get('phone') && control.root.get('countryCallingCode')) {
        const countryCode: string = control.root.get('countryCallingCode').value;
        const phoneNumber: string = control.root.get('phone').value;
        const phone: string = formatPhoneNumber(countryCode, phoneNumber);
        credentials.phone = phone;
      }
    }

    if (field === 'phone') {
      const countryCode: string = control.root.get('countryCallingCode').value;
      const phoneNumber: string = control.value;
      const phone: string = formatPhoneNumber(countryCode, phoneNumber);
      credentials.phone = phone;
      credentials.password = control.root.get('password').value;
    }

    if (field === 'email') {
      credentials.email = control.value;
      credentials.password = control.root.get('password').value;
    }

    return credentials;
  }

  static defineLoginMode(control): 'email' | 'phone' {
    if (control.root.get('email')) {
      return 'email';
    }

    if (control.root.get('phone') && control.root.get('countryCallingCode')) {
      return 'phone';
    }
  }
    
}