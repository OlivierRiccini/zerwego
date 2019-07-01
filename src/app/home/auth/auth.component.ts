import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from '../home.component';
import { MatDialogRef, MatStepper } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
// import { MyErrorStateMatcher } from '../../shared/utils/error-matcher';
import { UserInterfaceService } from '../../services/user-interface.service';
// import { SocialService } from '../../services/social.service';
// import { ContactMode } from '../../models/shared';
// import { ValidatePassword } from '../../shared/utils/validators';
// import { ICountryCode } from '../../models/auth';
// import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { Step } from 'src/app/models/shared';
import { StepperService } from 'src/app/services/stepper-service';

// export type Step = 'signup' | 'signin' | 'forgot-password';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') public stepper: MatStepper;
  private stepIndexes: {} = { 'signup': 0, 'signin': 1, 'forgot-password': 2 };
  private subscription: Subscription = new Subscription();
  // public currentStep: string;

  public labels = {
    title: null,
    // submit: null,
    // changeForm: null
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
    private steppService: StepperService
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

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public stepChanged(): void {
    this.stepper.selected.interacted = false;
  }

  private initDefaultStep(): void {
    const currentStep: Step = this.router.url.replace('/auth/', '') as Step;
    const currentStepIndex: number = this.stepIndexes[currentStep];
    this.defineLabels(currentStep);
    this.move(currentStepIndex);
  }
  
  private handleStepperNavigation(): void {
    const sub: Subscription = this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart && event.url && event.url.includes('/auth/')) {
        const currentStep: Step = event.url.replace('/auth/', '') as Step;
        const currentStepIndex: number = this.stepIndexes[currentStep];
        this.steppService.emitCurrentStep(currentStep);
        this.defineLabels(currentStep);
        this.move(currentStepIndex);
      }
    });
    this.subscription.add(sub);
  }

  private move(index: number): void {
    this.stepper.selectedIndex = index;
  }

  private defineLabels(currentStep: Step): void {
    switch(currentStep) {
      case 'signin':
        this.labels.title = 'Sign in';
        break;
      case 'signup':
        this.labels.title = 'Sign up';
        break;
      case 'forgot-password':
        this.labels.title = 'Forgot password';
        break;
      default:
        console.log('Impossible to define labels');
    }
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
