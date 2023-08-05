import { DataService } from "./../../data.service";
import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { RecipeService } from "../recipe.service";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { SnackBarService } from "../../shared/snack-bar-notification/snack-bar.service";
import { Recipe } from "src/app/models/Recipe";
import { DialogData } from "../recipe-details/recipe-details.component";

@Component({
  selector: "app-delete-recipe",
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule],
  templateUrl: "./delete-recipe.component.html",
  styleUrls: ["./delete-recipe.component.css"],
})
export class DeleteRecipeComponent {
  recipe: Recipe | undefined;
  recipeId: string = "";

  constructor(
    public dialogRef: MatDialogRef<DeleteRecipeComponent>,
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancle(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.recipeService.deleteRecipe(this.data.recipe._id).subscribe(() => {
      this.router.navigate(["/recipes"]);
      this.snackBar.notifySuccess("Recipe deleted successfully!");
    });
  }

  // ngOnInit(): void {
  //   this.recipe = this.activatedRoute.snapshot.data["recipe"];
  //   this.recipeId = this.activatedRoute.snapshot.paramMap.get(
  //     "recipeId"
  //   ) as string;
  // }
}
