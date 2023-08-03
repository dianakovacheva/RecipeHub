import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgFor } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { NgIf } from "@angular/common";

import { ProgressSpinnerComponent } from "../shared/progress-spinner/progress-spinner.component";
import { UserService } from "../user/user.service";
import { RecipesGalleryComponent } from "../recipe/recipes-gallery/recipes-gallery.component";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    RouterModule,
    ProgressSpinnerComponent,
    NgIf,
    RecipesGalleryComponent,
  ],
})
export class HomeComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}
}
