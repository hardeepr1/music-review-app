import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'mra-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }),
    });

    this.user = this.initializeUser();
  }

  //todo there can be other better method to do copying data from this an that
  registerUser(): void {
    if (this.userForm.dirty) {
      this.user.fullName = this.userForm.value.fullName;
      this.user.userName = this.userForm.value.userName;
      this.user.password = this.userForm.get('passwordGroup.password').value;

      console.log(this.user);

      this.authService.register(this.user).subscribe({
        next: (res) => this.setSession(res),
        error: (err) => console.log('In errors' + err),
      });
      console.log(this.userForm);
    }
  }

  handleError(error): void {
    console.log('here');
    console.log(error);
    console.log(error.status);
    console.log(error.headers);
  }

  setSession(response): void {
    this.authService.setSession(response);
  }

  private initializeUser(): User {
    return {
      fullName: null,
      userName: null,
      password: null,
    };
  }
}
