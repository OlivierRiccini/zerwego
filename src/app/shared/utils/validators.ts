import { AbstractControl } from '@angular/forms';

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