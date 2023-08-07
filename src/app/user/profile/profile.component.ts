import { Component, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { UserService } from "../user.service";
import { NgIf, NgFor } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { User } from "src/app/models/User";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RecipeService } from "src/app/recipe/recipe.service";
import { DeleteRecipeComponent } from "src/app/recipe/delete-recipe/delete-recipe.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Recipe } from "src/app/models/Recipe";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  standalone: true,
  imports: [
    MatTabsModule,
    NgIf,
    NgFor,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ProfileComponent implements OnInit {
  userRecipesList: any;
  user: User | undefined;

  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
    if (this.user) {
      this.getUserRecipes();
    }
  }

  getUserRecipes() {
    this.userService.getUserRecipesList().subscribe(
      (recipes) => {
        this.userRecipesList = recipes;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDeleteDialog(recipe: Recipe, $event: any): void {
    $event.stopPropagation();
    this.dialog
      .open(DeleteRecipeComponent, {
        data: { recipe: recipe, redirectToRecipes: false },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUserRecipes();
      });
  }

  // get userRecipes() {
  //   return this.userRecipesList;
  // }

  // get userComments() {
  //   return this.user?.comments;
  // }

  // get userSavedRecipes() {
  //   return this.user?.savedRecipes;
  // }

  // get userFirstName() {
  //   return this.user?.firstName;
  // }

  // get userLastName() {
  //   return this.user?.lastName;
  // }

  // get userEmail() {
  //   return this.user?.email;
  // }
}
