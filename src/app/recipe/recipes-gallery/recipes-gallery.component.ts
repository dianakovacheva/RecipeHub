import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgFor, NgIf } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

//  import { SpoonacularAPIService } from "../spoonacularAPI/spoonacular-api.service";
import { RecipeService } from "../recipe.service";
import { UserService } from "../../user/user.service";

import { Recipe } from "../../models/Recipe";

@Component({
  selector: "app-recipes-gallery",
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    NgFor,
    MatCardModule,
    RouterModule,
    NgIf,
    MatButtonModule,
  ],
  templateUrl: "./recipes-gallery.component.html",
  styleUrls: ["./recipes-gallery.component.css"],
})
export class RecipesGalleryComponent implements OnInit {
  recipesList: Recipe[] = [];
  isLoggedIn: boolean = true;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService
  ) {}

  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  // Get All Recipes
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipesList = recipes;
        this.isLoggedIn = false;
      },
      error: (err) => {
        this.isLoggedIn = false;
        console.error(`Error: ${err}`);
      },
    });
  }
}
