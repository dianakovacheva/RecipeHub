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
    MatDialogModule,
  ],
})
export class ProfileComponent implements OnInit {
  userRecipesList: Recipe[] | undefined;
  userSavedRecipesList: any;
  userCommentsList: any;
  user: User | undefined;

  userInformation: User = {
    firstName: "",
    lastName: "",
    email: "",
  };

  constructor(private userService: UserService, private dialog: MatDialog) {}

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
    }
  }

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

  // getUserInformation(user._id) {
  //   this.userService.getProfile(userId).subscribe(
  //     (user) => {
  //       this.userFirstName = user.firstName;
  //       this.userLastName = user.lastName;
  //       this.userEmail = user.email;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

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

  // get userComments() {
  //   return this.user?.comments;
  // }

  // get userSavedRecipes() {
  //   return this.user?.savedRecipes;
  // }

  // get userLastName() {
  //   return this.user?.lastName;
  // }

  // get userEmail() {
  //   return this.user?.email;
  // }
}
