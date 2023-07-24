import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
  ],
})
export class RegisterComponent {
  submitted = false;
  hidePass = true;
  hideRePass = true;

  constructor(private router: Router) {}

  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  getErrorMessageFirstName() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.firstName.hasError('minlength')
      ? 'First name must be min 2 chars long.'
      : '';
  }

  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  getErrorMessageLastName() {
    if (this.lastName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.lastName.hasError('minlength')
      ? 'Last name must be min 2 chars long.'
      : '';
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength')
      ? 'Password must be at least 8 characters'
      : '';
  }

  rePassword = new FormControl('', Validators.required);

  getErrorMessageRePassword() {
    if (this.rePassword.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.value !== this.rePassword.value) {
      this.rePassword.setErrors({ noMatch: true });
    }
    return this.rePassword.hasError('noMatch') ? 'Passwords must match' : '';
  }
}
