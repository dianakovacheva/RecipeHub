import { CommonModule, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "src/app/user/user.service";

/**
 * @title Basic toolbar
 */

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    RouterModule,
    CommonModule,
    NgIf,
  ],
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(["/"]);
      },
      error: () => {
        this.router.navigate(["/"]);
      },
    });
  }
}
