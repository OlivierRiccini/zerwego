import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBtnComponent } from './edit-btn/edit-btn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    EditBtnComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    EditBtnComponent,
    ConfirmComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class SharedModule { }
