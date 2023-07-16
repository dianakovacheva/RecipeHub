import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/**
 * @title Card with sub-title
 */

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
  ],
})
export class RegisterComponent {
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
}
