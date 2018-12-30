import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBtnComponent } from './edit-btn/edit-btn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    EditBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    EditBtnComponent
]
})
export class SharedModule { }
