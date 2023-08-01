import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { NgFor } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { Recipe } from "../models/Recipe";
import { SpoonacularAPIService } from "../spoonacularAPI/spoonacular-api.service";
import { UserService } from "../user/user.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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
  ],
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"],
})
export class RecipesListComponent {
  tiles: Tile[] = [
    { text: "One", cols: 1, rows: 1, color: "lightblue" },
    { text: "Two", cols: 1, rows: 1, color: "lightgreen" },
    { text: "Three", cols: 1, rows: 1, color: "lightblue" },
    { text: "Four", cols: 1, rows: 1, color: "lightgreen" },
  ];

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  recipesList: Recipe[] = [];
  isLoggedIn: boolean = true;

  constructor(
    private apiService: SpoonacularAPIService,
    private userService: UserService
  ) {}

  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe({
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
