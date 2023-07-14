import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  login(): void {
    // ToDo: for now we are not handling the data
    // this.userService.login();
    this.router.navigate(['/']);
  }
}
