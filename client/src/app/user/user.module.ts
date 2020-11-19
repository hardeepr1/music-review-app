import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
      ],
    imports:[
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent},
        ])
    ]
    
})
export class UserModule{}