import { Component } from "@angular/core";
import { NgIf } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Router, RouterModule } from "@angular/router";

import { UserService } from "../user.service";
import { SnackBarService } from "src/app/snack-bar-notification/snack-bar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
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
    RouterModule,
  ],
})
export class LoginComponent {
  submitted: boolean = false;
  hidePass: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  // Functions that check if there is an error and return appropriate error message
  getErrorMessageEmail() {
    const emailInput = this.loginForm.get("email");

    if (emailInput!.hasError("required")) {
      return "You must enter a value";
    }

    return emailInput!.hasError("email") ? "Not a valid email" : "";
  }

  getErrorMessagePassword() {
    const passwordInput = this.loginForm.get("password");
    if (passwordInput!.hasError("required")) {
      return "You must enter a value";
    }

    return passwordInput!.hasError("minlength")
      ? "Password must be at least 8 characters"
      : "";
  }

  // Login function that will be called on form submit event
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    // Pass form data to login function of userService
    this.userService
      .login(
        this.loginForm.value.email ?? "",
        this.loginForm.value.password ?? ""
      )
      .subscribe(() => {
        this.router.navigate(["/"]);
        this.snackBar.greetUser();
      });
  }
}
