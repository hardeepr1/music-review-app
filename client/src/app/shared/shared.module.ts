import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
    exports:[
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule{}