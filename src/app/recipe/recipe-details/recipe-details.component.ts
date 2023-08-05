import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgIf, NgFor } from "@angular/common";

import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule } from "@angular/router";

import { Recipe } from "../../models/Recipe";
import { RecipeService } from "../recipe.service";
import { UserId } from "../../models/UserId";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"],
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    CommonModule,
    NgIf,
    NgFor,
    MatDividerModule,
    RouterModule,
  ],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  user: UserId | undefined;
  userId: UserId["_id"] | undefined;
  userIsOwner: boolean | undefined;

  recipeId = this.activatedRoute.snapshot.params["recipeId"];

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) {}

  //isLoggedIn = this.recipeService.isLoggedIn;

  ngOnInit(): void {
    this.getRecipeById();
    this.recipeService.userIsOwner$.subscribe((isOwner) => {
      this.userIsOwner = isOwner;
    });
  }

  getRecipeById(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe((foundRecipe) => {
      this.recipe = foundRecipe;
    });
  }
}
