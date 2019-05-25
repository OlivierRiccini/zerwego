import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsListComponent } from './trips-list/trips-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { MySpaceComponent } from './my-space.component';
import { MySpaceRoutingModule } from './my-space-routing.module';

@NgModule({
  declarations: [
    MySpaceComponent,
    TripsListComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MySpaceRoutingModule
  ]
})
export class MySpaceModule {}
