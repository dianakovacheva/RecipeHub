import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { Recipe } from "src/app/models/Recipe";
import { DeleteRecipeComponent } from "src/app/recipe/delete-recipe/delete-recipe.component";
import { MatButtonModule } from "@angular/material/button";
import { NgIf, NgFor } from "@angular/common";
import { ProfileComponent } from "../profile.component";

@Component({
  selector: "app-profile-recipe-list",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    NgIf,
    NgFor,
  ],
  templateUrl: "./profile-recipe-list.component.html",
  styleUrls: ["./profile-recipe-list.component.css"],
})
export class ProfileRecipeListComponent {
  @Input() recipesArray: Recipe[] | undefined;
  @Input() listType: "userRecipes" | "userSavedRecipes" | undefined;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private profileComponent: ProfileComponent
  ) {}

  openDeleteDialog(recipe: Recipe, $event: any): void {
    $event.stopPropagation();
    this.dialog
      .open(DeleteRecipeComponent, {
        data: { recipe: recipe, redirectToRecipes: false },
      })
      .afterClosed()
      .subscribe(() => {
        if (this.listType === "userRecipes") {
          this.profileComponent.getUserRecipes();
        } else if (this.listType === "userSavedRecipes") {
          this.profileComponent.getUserSavedRecipes();
        }
      });
  }
}
