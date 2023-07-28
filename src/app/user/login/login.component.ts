import { Component } from "@angular/core";
import { UserService } from "../user.service";
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
import { Router, RouterModule } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

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
    MatSnackBarModule,
  ],
})
export class LoginComponent {
  submitted: boolean = false;
  hidePass: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    public welcomeUserSnackBar: MatSnackBar
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

  // Get user's first and last name
  get userFullName(): string {
    const userFistName = this.userService.user?.firstName;
    const userLastName = this.userService.user?.lastName;
    return `Welcome ${userFistName} ${userLastName}` || "";
  }

  // Welcome user after login
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

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
        this.router.navigate(["/"]).then(() => {
          this.welcomeUserSnackBar.open(this.userFullName, "", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        });
      });
  }
}
