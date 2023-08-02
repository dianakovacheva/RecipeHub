import { Component, OnInit } from "@angular/core";
import { NgFor } from "@angular/common";

import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

//  import { SpoonacularAPIService } from "../spoonacularAPI/spoonacular-api.service";
import { RecipeService } from "../recipe/recipe.service";
import { UserService } from "../user/user.service";

import { Recipe } from "../models/Recipe";

// export interface Tile {
//   color: string;
//   cols: number;
//   rows: number;
//   text: string;
// }

/**
 * @title Dynamic grid-list
 */

@Component({
  selector: "app-recipes-list",
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    NgFor,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"],
})
export class RecipesListComponent implements OnInit {
  // tiles: Tile[] = [
  //   { text: "One", cols: 1, rows: 1, color: "lightblue" },
  //   { text: "Two", cols: 1, rows: 1, color: "lightgreen" },
  //   { text: "Three", cols: 1, rows: 1, color: "lightblue" },
  //   { text: "Four", cols: 1, rows: 1, color: "lightgreen" },
  // ];

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

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
