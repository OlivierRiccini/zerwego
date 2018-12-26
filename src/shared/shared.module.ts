import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
    declarations: [
        // FormsModule,
        // ReactiveFormsModule,
        // HttpModule,
        // HttpClientModule,
        // BrowserAnimationsModule,
        // MaterialModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
    ]
})
export class SharedModule {}