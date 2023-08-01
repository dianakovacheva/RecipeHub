import { CommonModule, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "src/app/user/user.service";
import { SnackBarService } from "src/app/snack-bar-notification/snack-bar.service";
import { NgOptimizedImage } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";

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
    NgOptimizedImage,
    MatDividerModule,
  ],
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(["/"]);
        this.snackBar.goodbyeUser();
      },
      error: (err) => {
        this.router.navigate(["/"]);
        this.snackBar.notifyError(err);
      },
    });
  }
}
