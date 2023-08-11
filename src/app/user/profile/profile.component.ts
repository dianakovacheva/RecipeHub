import { Component, OnInit } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { UserService } from "../user.service";

import { User } from "src/app/models/User";
import { MatCardModule } from "@angular/material/card";
import { Recipe } from "src/app/models/Recipe";
import { ProfileRecipeListComponent } from "./profile-recipe-list/profile-recipe-list.component";
import { Comment } from "src/app/models/Comment";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  standalone: true,
  imports: [MatTabsModule, MatCardModule, ProfileRecipeListComponent, NgFor],
})
export class ProfileComponent implements OnInit {
  userRecipesList: Recipe[] | undefined;
  userSavedRecipesList: Recipe[] | undefined;
  userCommentsList: Comment[] | undefined;
  user: User | undefined;

  userInformation: User = {
    firstName: "",
    lastName: "",
    email: "",
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const { firstName, lastName, email } = this.userService.user!;
    this.userInformation = {
      firstName,
      lastName,
      email,
    };

    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
    if (this.user) {
      this.getUserRecipes();
      this.getUserSavedRecipes();
      this.getUserComments();
    }
  }

  // User Recipes
  getUserRecipes() {
    this.userService.getUserRecipesList().subscribe({
      next: (recipes) => {
        this.userRecipesList = recipes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // User Saved Recipes
  getUserSavedRecipes() {
    this.userService.getUserSavedRecipesList().subscribe({
      next: (savedRecipes) => {
        this.userSavedRecipesList = savedRecipes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // User Comments
  getUserComments() {
    this.userService.getUserCommentsList().subscribe({
      next: (comments) => {
        console.log(comments);

        this.userCommentsList = comments;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
