import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserInfoComponent } from '../user-info.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmailNotTaken, ValidatePhoneNotTaken } from 'src/app/shared/utils/validators';
import { ICountryCode } from 'src/app/models/auth';
import { DataService } from 'src/app/services/data.service';
// import { startWith, map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// const lookup = require('country-data').lookup;

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss', '../user-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditInfoComponent extends UserInfoComponent implements OnInit {
  public form: FormGroup;
  public isEditMode: boolean = false;
  // public countryCodes: string[];
  public countryCodes: ICountryCode[];
  // public filteredCountryCodes: string[];
  public filteredCountryCodes: ICountryCode[];
  public userCountry: string[] = [];

  constructor(public authService: AuthService, public fb: FormBuilder, private dataService: DataService) { 
    super(authService, fb)
  }

  public async ngOnInit() {
    await this.createForm();
  }
  
  public onToggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.form.reset();
      for (const ctl in this.form.controls) {
        this.form.get(ctl).disable();
        this.form.get(ctl).setValue(this.getDefaultValues()[ctl]);
      }
    } else {
      for (const ctl in this.form.controls) {
        this.form.get(ctl).enable();
      }
    }
  }

  public onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  private async createForm(): Promise<void> {
    // const c = await this.dataService.getUserContry();
    // var country = lookup.countries({alpha3: c});
    // this.userCountry.push(country[0].alpha2.toLowerCase());

    this.form = this.fb.group({
      username: [{ value: this.getDefaultValues().username, disabled: !this.isEditMode}, [Validators.required]],
      email: [{ value: this.getDefaultValues().email, disabled: !this.isEditMode}],
      phone: [{ value: this.getDefaultValues().phone, disabled: !this.isEditMode}],
      countryCallingCode: [{ value: this.getDefaultCountryCode(), disabled: !this.isEditMode}],
    });
    this.form.controls['email'].setAsyncValidators(ValidateEmailNotTaken.createValidator(this.authService, this.getDefaultValues().email));
    this.form.controls['phone'].setAsyncValidators(ValidatePhoneNotTaken.createValidator(this.authService, this.getDefaultValues().phone));

    this.initCountryCodes();
  }

  private getDefaultValues(): { username: string, email: string, phone: string } {
    return {
      username: this.currentUser.username ? this.currentUser.username : '',
      email: this.currentUser.email ? this.currentUser.email : '',
      phone: this.currentUser.phone ? this.currentUser.phone : ''
    }
  }

  private getDefaultCountryCode(): string {
    return '';
  }

  private initCountryCodes(): void {
    // this.countryCodes = this.dataService.countryCodes.map(e => `${e.emoji} ${e.ioc} ${e.countryCallingCode}`);
    this.countryCodes = this.dataService.countryCodes;
    this.form.get('countryCallingCode').valueChanges.subscribe(value => this._filter(value));
  }

  private _filter(value: string): void {
    // console.log(filterValue);
    const filterValue = value.toLowerCase();

    // try by ioc
    // this.filteredCountryCodes = this.countryCodes.filter(option => option.ioc.toLowerCase().includes(filterValue));
    // try by countryCallingCode
    this.filteredCountryCodes = this.countryCodes.filter(option => option.ioc.toLowerCase().includes(filterValue));
    // // try by ioc
    // this.filteredCountryCodes = this.countryCodes.filter(option => option.ioc.toLowerCase().includes(filterValue));
    // return this.countryCodes.filter(option => option.toLowerCase().includes(filterValue));
  }

}
