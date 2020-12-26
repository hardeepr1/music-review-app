import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mra-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle: string = 'Log In';
  loginForm: FormGroup;
  errorMessage: String;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    //to do handle if server return passwrod incorrect error or other things
    if (this.loginForm && this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password).subscribe({
        next: (response) => this.loginSuccess(response),
        error: (err) => (this.errorMessage = err.error.errorMessage),
      });
    } else {
      //show the message
    }
  }

  loginSuccess(response): void {
    //if login is successful set session
    this.authService.setSession(response);

    //redirect to url
    if (this.authService.redirectURL) {
      this.router.navigateByUrl(this.authService.redirectURL);
    } else {
      this.router.navigate(['/songs']);
    }
  }
}
