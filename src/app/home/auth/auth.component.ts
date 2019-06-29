import { Component, OnInit, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from '../home.component';
import { MatDialogRef, MatStepper } from '@angular/material';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { MyErrorStateMatcher } from '../../shared/utils/error-matcher';
import { UserInterfaceService } from '../../services/user-interface.service';
import { SocialService } from '../../services/social.service';
import { ContactMode } from '../../models/shared';
import { ValidatePassword } from '../../shared/utils/validators';
import { ICountryCode } from '../../models/auth';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  @ViewChild('stepper') public stepper: MatStepper;
  private stepIndexes: {} = { 'signup': 0, 'signin': 1, 'forgot-password': 2 };
  // public currentStep: string;

  public label = {
    title: null,
    submit: null,
    changeForm: null
  }; 
  // public signUpMode: boolean = true; 
  // public authForm: FormGroup;
  // public matcher = new MyErrorStateMatcher();
  
  // public forgotPasswordFormIsPhone = false;
  // public forgotPasswordFormIsEmail = true;
  // public authFormIsEmail: boolean = true;
  // public authFormIsPhone: boolean = false;
  // public countryCodes: ICountryCode[];

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public dialogRef: MatDialogRef<HomeComponent>,
    public router: Router,
    public userInterfaceService: UserInterfaceService,
    public socialService: SocialService,
    public dataService: DataService
    ) {
      // const currentStep = this.router.url.replace('/', '')}Mode`
      // console.log(this.currentStep);
    }
    
  public ngOnInit() {
    if (this.stepper) {
      this.initDefaultStep();
      this.handleStepperNavigation();
    }
  }

  private initDefaultStep(): void {
    const currentStep: string = this.router.url.replace('/auth/', '');
    const currentStepIndex: number = this.stepIndexes[currentStep];
    this.move(currentStepIndex);
  }
  
  private handleStepperNavigation(): void {
    this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart && event.url) {
        const currentStep: string = event.url.replace('/auth/', '');
        const currentStepIndex: number = this.stepIndexes[currentStep];
        this.move(currentStepIndex);
      }
    });
  }

  private move(index: number) {
    this.stepper.selectedIndex = index;
  }
  // public onSelectContactMode(formName: string, form: FormGroup, contactMode: ContactMode): void {
  //   const validators = [ Validators.required ];
  //   let toAdd: string;
  //   let toRemove: string;
  //   if (contactMode === 'email') {
  //     this[formName + 'IsEmail'] = true;
  //     this[formName + 'IsPhone'] = false;
  //     toAdd = formName === 'authForm' ? 'email' : 'emailForgotPass';
  //     toRemove = formName === 'authForm' ? 'phone' :  'phoneForgotPass';
  //     validators.push(Validators.email);
  //     // form.removeControl('countryCallingCode');
  //   } else {
  //     this[formName + 'IsEmail'] = false;
  //     this[formName + 'IsPhone'] = true;
  //     toAdd = formName === 'authForm' ? 'phone' : 'phoneForgotPass';
  //     toRemove = formName === 'authForm' ? 'email' : 'emailForgotPass';
  //     // form.addControl('countryCallingCode', new FormControl('', Validators.required));
  //   }
  //   form.addControl(toAdd, new FormControl('', validators));
  //   form.removeControl(toRemove);
  //   this[formName].controls[toAdd].setAsyncValidators(ValidatePassword.createValidator(this.authService, toAdd as 'email' | 'phone'));
  // }

  // public onChangeDialogMode(mode: 'signup' | 'signin') {
  //     this.dialogRef.close();
  //     this.router.navigate(['./', mode]);
  //     this.authService.switchDialog(true);
  // }


  // public async onFacebookLogin() {
  //   this.onCloseDialog();
  //   await this.socialService.fbLogin();
  // }

  public onCloseDialog() {
    this.router.navigate(['/']);
    this.dialogRef.close();
  }

  // private createForm() {
  //   this.authForm = this.fb.group({
  //     contactMode: ['email'],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required]
  //   });
  //   // this.initCountryCodes();
  // }

  // private initCountryCodes(): void {
  //   this.countryCodes = this.dataService.countryCodes;
  // }
  
}
