import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsListComponent } from './trips-list/trips-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { MySpaceComponent } from './my-space.component';
import { MySpaceRoutingModule } from './my-space-routing.module';
import { EditInfoComponent } from './user-info/edit-info/edit-info.component';
import { ResetPasswordComponent } from './user-info/reset-password/reset-password.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    MySpaceComponent,
    TripsListComponent,
    UserInfoComponent,
    EditInfoComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MySpaceRoutingModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule
  ]
})
export class MySpaceModule {}
