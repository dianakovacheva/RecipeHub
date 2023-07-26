import { Component } from "@angular/core";
import { Router } from "@angular/router";
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
import { NgIf } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { UserService } from "./user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
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
  submitted: boolean = false;
  hidePass: boolean = true;
  hideRePass: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  registerForm = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    rePassword: new FormControl("", Validators.required),
  });

  // Functions that check if there is a error and return appropriate error message
  getErrorMessageFirstName() {
    const firstNameInput = this.registerForm.get("firstName");

    if (firstNameInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return firstNameInput!.hasError("minlength")
      ? "First name must be min 2 chars long."
      : "";
  }

  getErrorMessageLastName() {
    const lastNameInput = this.registerForm.get("lastName");

    if (lastNameInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return lastNameInput!.hasError("minlength")
      ? "Last name must be min 2 chars long."
      : "";
  }

  getErrorMessageEmail() {
    const emailInput = this.registerForm.get("email");
    if (emailInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return emailInput!.hasError("email") ? "Not a valid email." : "";
  }

  getErrorMessagePassword() {
    const passwordInput = this.registerForm.get("password");

    if (passwordInput!.hasError("required")) {
      return "You must enter a value.";
    }

    return passwordInput!.hasError("minlength")
      ? "Password must be at least 8 characters."
      : "";
  }

  getErrorMessageRePassword() {
    const rePasswordInput = this.registerForm.get("rePassword");
    const passwordInput = this.registerForm.get("password");

    if (rePasswordInput!.hasError("required")) {
      return "You must enter a value.";
    }

    if (passwordInput?.value !== rePasswordInput?.value) {
      rePasswordInput!.setErrors({ noMatch: true });
    }

    return rePasswordInput!.hasError("noMatch") ? "Passwords must match." : "";
  }

  // Register function that will be called on form submit event
  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    // Pass form data to register function of userService
    this.userService
      .register(
        this.registerForm.value.firstName ?? "",
        this.registerForm.value.lastName ?? "",
        this.registerForm.value.email ?? "",
        this.registerForm.value.password ?? "",
        this.registerForm.value.rePassword ?? ""
      )
      .subscribe(() => {
        this.router.navigate(["/recipes"]);
      });
  }
}
